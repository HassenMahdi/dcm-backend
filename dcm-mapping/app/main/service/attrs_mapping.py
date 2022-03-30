# Essential imports
import re
# Import text feature extraction TfidfVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np
import pandas as pd
from deep_translator import GoogleTranslator
import json
import csv
from os.path import dirname, join

# Import Cosine Similarity metric
from sklearn.metrics.pairwise import cosine_similarity


# Function to translate a given word in english
def translate_word(word):
    """This function is used for translating words specificly to english
        It takes a given word as argument and returns the translation
        Its main role is to translate attributes comming from source file,
        that it could be in any language and translate it to english because 
        FHIR standard is in english
    """

    word = word.lower()
    
    # translator = Translator()  # Initialize translator instance
    # translation = translator.translate(word, dest="en")
    return GoogleTranslator(source='auto', target='en').translate(word)

def preprocess_text(sentence):
    """This function represents the text processing (lowerizing, stemming, lemmatization)
    """

    #defining the object for stemming
    porter_stemmer = PorterStemmer()
    #defining the object for Lemmatization
    wordnet_lemmatizer = WordNetLemmatizer()

    # Make the sentence in lower case
    sentence = sentence.lower()
    # Define stopwords to remove
    stop_words = set(stopwords.words('english'))
    # Tokenize the sentence
    word_tokens = word_tokenize(sentence)

    # Remove stopwords
    filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words]

    # Stem the sentence
    stem_text = [porter_stemmer.stem(word) for word in filtered_sentence]
    # Lemmatize the sentence
    lemm_text = [wordnet_lemmatizer.lemmatize(word) for word in stem_text]

    return ' '.join(lemm_text)

# Function to analyse text using NLP (TF-IDF)
def tfidf_analyse(key, value, df):
    """This function uses TF-IDF to calculate the similarity between texts
    """

    # Create a new row containing the current source attribute
    new_row = pd.DataFrame([{'Name': key, 'Description & Constraints': value}])
    # Adding the created row to the dataframe
    df = pd.concat([df, new_row])

    # We remove the first row because it contains just the name of the resource that we don't actually need in this function
    df = df.iloc[1: , :]

    # Get the description column
    doc_list = df['Description & Constraints']

    # Lowerize the descriptions
    doc_list = map(lambda x: x.lower(), doc_list)

    # Call the preprocess function for each description
    doc_list = map(preprocess_text, doc_list)

    # Create TFidfVectorizer 
    tfidf= TfidfVectorizer()

    # Fit and transform the documents 
    tfidf_vector = tfidf.fit_transform(doc_list)

    # Compute cosine similarity
    cosine_sim=cosine_similarity(tfidf_vector, tfidf_vector)

    # Get the index of the most similar description
    index = np.argmax(cosine_sim[-1][:-1])

    # Remove the last row which is the current src attr
    df = df.iloc[:-1 , :]

    # We return two things, the name of the resource and the name of the attribute
    return df.iloc[index]['Resource'], df.iloc[index]['Name']


# Function to process attrs
def clean_up_attr(attr):
    """
    This function used to clean up source attributes
    """
    try:
        # remove '\ufeff' character from the attribute name
        attr = re.findall('"([^"]*)"', attr.replace('\ufeff', ''))[0]
    except:
        # Remove additional spaces using stripe() method
        attr = attr.strip()

    return attr


# A function to get return object information
def get_attr_obj(resource_name, attr_name, aux_file_obj):
    for array in aux_file_obj['fhir_more_info']:
        for obj in array:
            if (obj['Resource'] == resource_name) and (obj['Name'].strip() == attr_name):
                return obj


# Function to handle the return if there is some attributes which have type of list (array)
def handle_return(return_list, resource_name, aux_file):
    """
    Function to handle the return result if there is list types in attributes
        Arguments:
            aux_file: auxilary dict object
            return_list: the return result without handling list types
            resource_name: a string representing the name of the resource
        Returns:
            List of objects including list types attributes
    """

    list_type_attr = {}
    for result in return_list:
        attr = result['target'].split('.')[0]
        ob = get_attr_obj(resource_name, attr, aux_file)

        if ob['Card.'].endswith('*'):
            try:
                list_type_attr[attr].append(result['target'].split('.')[1])
            except Exception as ex:
                list_type_attr[attr] = []
                list_type_attr[attr].append(result['target'].split('.')[1])

    for key, values in list_type_attr.items():
        values = list(dict.fromkeys(values))
        
        for value in values:
            i = 0
            for result in return_list:
                if (result['target'].split('.')[0] == key) and (result['target'].split('.')[1] == value):
                    result['target'] = result['target'].split('.')[0] + '.[' + str(i) + '].' + '.'.join(result['target'].split('.')[1:])
                    i += 1

    return return_list


def get_filename(filename):
    here = dirname(__file__)
    output = join(here, filename)
    return output


# The main function
def main(headers, resource_name):

    """
    Main function to be called
        Arguments:
            aux_file_path: a string representing the path of the auxilary file (aux_file.json)
            headers: a string representing the path of the source file (.csv)
            resource_name: a string representing the name of the resource
        Returns:
            List of objects of type:
                {
                    "target": value,
                    "source": value
                }
    """

    headers = [header for header in headers if header != ""]

    # Download important nltk modules using nltk.download()
    nltk.download('stopwords')
    nltk.download('wordnet')
    nltk.download('punkt')
    nltk.download('omw-1.4')

    resource_name = resource_name.lower()
    aux_file_path = get_filename('aux_file.json')

    try:
        # Open the auxilary file
        with open(aux_file_path, 'r', encoding="utf8") as f:
            aux_file = json.load(f)
    except FileNotFoundError as e:
        return "The given path of the auxilary file is not correct"

    # Create a dataframe to work with
    df = pd.DataFrame()

    # Loop over each list of fhir_more_info
    for obj in aux_file['fhir_more_info']:

        dd = pd.DataFrame(obj)
        # Remove empty rows from the dataframe
        dd.drop(dd[dd["Description & Constraints"]==""].index, inplace = True)

        # Fill the main dataframe to work with
        df = pd.concat([df, dd])


    # Get more information about source attributes
    more_info = aux_file['more_info']

    # Get the mapping dict
    mapping_dict = aux_file['mapping_dict']

    # Read source file attribute
    # source_attrs = read_csv_attributes(headers)
    source_attrs = list(headers)


    for source_attr in source_attrs:

        try:
            if mapping_dict[source_attr.lower()] == "":
                result = tfidf_analyse(source_attr.lower(), translate_word(more_info[source_attr.lower()]), df)
                mapping_dict[source_attr] = result[0].capitalize() + "." + result[1].strip()
        except KeyError as ex:
            more_info[source_attr.lower()] = source_attr
            result = tfidf_analyse(source_attr.lower(), translate_word(more_info[source_attr.lower()]), df)
            mapping_dict[source_attr.lower()] = result[0].capitalize() + "." + result[1].strip()

    # List of dicts containing results of each src attr
    return_result = [{"target": '.'.join(mapping_dict[src.lower()].split('.')[1:]), "source": src} for src in source_attrs if mapping_dict[src.lower()].split('.')[0].lower()==resource_name.lower()]

    return handle_return(return_result, resource_name, aux_file)

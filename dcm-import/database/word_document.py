from database.connection import mongo


class WordDocument:
    def get_all_words(self):
        words = mongo.db.words
        return words.find({})

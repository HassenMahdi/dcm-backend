export function GetMappingDataToModel(mapping)
{
    const model = {}
    if(mapping)
    {
      mapping.forEach(m => {
        model[m['target']] = m['source']
      });
    }
    return model;
}
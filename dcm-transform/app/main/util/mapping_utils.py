from app.db.Models.mapping import MapperDocument


def map_source_targets(df, mapping_id):
  mappings = MapperDocument().get_mappings(mapping_id)
  mapped_cols = {}
  for rule in mappings['rules']:
    mapped_cols[rule['source'][0]] = rule['target']

  df.rename(columns=mapped_cols, inplace=True)

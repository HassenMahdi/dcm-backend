from app.db.Models.mapping import MapperDocument


def map_source_targets(df, mapping_id):
  mappings = MapperDocument().get_mappings(mapping_id)
  mapped_cols = {}
  for rule in mappings['rules']:
    mapped_cols[rule['source'][0]] = rule['target']

  # Columns mappings
  df.rename(columns=mapped_cols, inplace=True)

  # Drop columns that are not in the mapping
  target_keys = list(mapped_cols.keys())
  mapped_df = df.drop(columns=[col for col in df if col not in target_keys])

  return mapped_df

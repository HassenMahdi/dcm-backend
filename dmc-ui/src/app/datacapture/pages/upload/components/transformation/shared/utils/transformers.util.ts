export const getPreviousHeader = (headers, previousNodes) => {
    const all = new Set(headers);
    for (let t of previousNodes){
      switch (t.type) {
        case 'delete-column':
          if (t.columns){
            for (let c of t.columns){
              all.delete(c);
            }
          }
          break;
        case 'merge':
        case 'default-value':
        case 'calculator':
          if (t.destination){
            all.add(t.destination);
          }
          break;
          case 'split':
            if (t.column){
              all.add(`${t.column}_part_0`);
              all.add(`${t.column}_part_1`);
            }
            break;
        case 'substring':
          {
            (t.substrings || [])
              .map(sub=>sub.column)
              .filter(c=>!!c)
              .forEach(c => {
                all.add(c)
              });
            break;
          }
      }
    }
    return Array.from(all);
}
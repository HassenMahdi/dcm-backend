import { getPreviousHeader } from '../../shared/utils/transformers.util';
import { isStrEmpty } from '@app/shared/utils/strings.utils';
import { GAPIColumnsInRange, GAPICellValue, GAPSeletedRowRange } from '@app/shared/utils/grid-api.utils';
import { isArrayEmpty } from '@app/shared/utils/arrays.utils';

export class Transformer {
  type;
  label;
  icon;
  component;
  icon_rotation = 0;
  description = 'Description Template';
  shortcut = null;
  collapse = false;

  getErrors = (params, previousNodes, headers): any => {
    return [];
  }

  getRule() {
    return {
      type: this.type
    };
  }

  getRuleFromGrid(params) {
    return this.getRule();
  }

  setComponent(comp) {
    this.component = comp;
    return this;
  }
}

export class NodeError {
  field; reason;
  constructor(field, reason) {
    this.field = field;
    this.reason = reason;
  }
}

export class DeleteRow extends Transformer {
  type = 'delete-rows';
  label = 'Delete Rows';
  icon = 'delete-row';
  shortcut = 'control.d';
  collapse = true;
  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (params.from == null || params.from === '') { errors.push(new NodeError('from', 'Starting line missing')); }
    if (params.to == null || params.to === '') { errors.push(new NodeError('to', 'End line missing')); }
    return errors;
  }

  getRuleFromGrid(params) {
    const range = params.api.getCellRanges()[0];
    let from = 1;
    let to = 1;
    if (range) {
      const start = range.startRow.rowIndex + 1;
      const end = range.endRow.rowIndex + 1;
      from = Math.min(start, end);
      to = Math.max(start, end);
    }
    return {
      ...this.getRule(),
      from,
      to
    };
  }
}

export class DeleteColumns extends Transformer {
  type = 'delete-column';
  label = 'Delete Columns';
  icon = 'scissor';
  shortcut = 'control.alt.d';
  collapse = true;

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (!params.columns || (params.columns && params.columns.length === 0)) {
      errors.push(new NodeError('columns', 'Missing Column'));
    } else {
      const previousHeaders: any[] = getPreviousHeader(headers, previousNodes);
      for (const column of params.columns) {
        if (previousHeaders.indexOf(column) < 0) {
          errors.push(new NodeError('columns', `${column} does not exist`));
        }

      }
    }
    return errors;
  }

  getRuleFromGrid(params) {
    const columns = GAPIColumnsInRange(params.api);
    return {
      ...this.getRule(),
      columns
    };
  }
}

export class Replace extends Transformer {
  shortcut = 'control.r';
  type = 'replace';
  label = 'Replace';
  icon = 'swap';

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (isStrEmpty(params.column)) {
      errors.push(new NodeError('column', 'Column missing'));
    } else {
      const previousHeaders: any[] = getPreviousHeader(headers, previousNodes);
      if (previousHeaders.indexOf(params.column) < 0) {
        errors.push(new NodeError('column', `${params.column} does not exist`));
      }
    }
    if (params.to === params.from) {
      errors.push(new NodeError('from', 'From and To should be different'));
      errors.push(new NodeError('to', ''));
    }
    return errors;
  }

  getRuleFromGrid(params) {
    let column = null;
    let from = null;
    const range = params.api.getCellRanges()[0];
    if (range) {
      column = range.startColumn.colDef.field;
      const cellValues = new Set();
      const start = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
      const end = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
      for (let index = start; index <= end; index++) {
        cellValues.add(GAPICellValue(params.api, column, index));
      }
      from = Array.from(cellValues).join('|');
    }
    return {
      ...this.getRule(),
      column,
      from
    };
  }
}

export class Merge extends Transformer {
  shortcut = 'control.m';
  type = 'merge';
  label = 'Merge';
  icon = 'merge-cells';

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (isArrayEmpty(params.columns)) {
      // errors.push(new NodeError('columns', 'Missing Column'))
    } else {
      const previousHeaders: any[] = getPreviousHeader(headers, previousNodes);
      for (const column of params.columns) {
        if (previousHeaders.indexOf(column) < 0) {
          errors.push(new NodeError('column ', `${column} does not exist`));
        }
      }
    }
    if (isStrEmpty(params.destination)) { errors.push(new NodeError('destination', 'Destination Missing')); }
    return errors;
  }

  getRuleFromGrid(params) {
    const columns = GAPIColumnsInRange(params.api);
    const separator = '-';
    const destination = columns.join(separator);
    return {
      ...this.getRule(),
      columns,
      destination,
      separator
    };
  }
}

export class Filter extends Transformer {
  shortcut = 'control.f';
  type = 'filter';
  label = 'Delete Rows with Filter';
  icon = 'filter';

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    let i = 0;
    const conditions = (params.conditions || [])
    if (conditions.length == 0) errors.push(new NodeError(null, `Number of conditions should be at least 1`));
    for (const c of conditions) {
      if (isStrEmpty(c.column)) { errors.push(new NodeError('column', `Column ${i + 1} missing`)); }
      if (isStrEmpty(c.condition)) { errors.push(new NodeError('condition', `Condition ${i + 1} Missing`)); }
      if (isStrEmpty(c.op)) { errors.push(new NodeError('op', `Operator ${i + 1} missing`)); }
      i++;
    }
    return errors;
  }

  getRuleFromGrid(params) {
    const columns = GAPIColumnsInRange(params.api);
    const rowsRange = GAPSeletedRowRange(params.api);
    return {
      ...this.getRule(),
      conditions: columns.map((c => ({ column: c })))
    };
  }
}


export class FilterAndReplace extends Transformer {
  shortcut = 'control.alt.r';
  type = 'find-replace';
  label = 'Find and Replace with Filter';
  icon = 'search';

  getErrors = (params, previousNodes, headers) => {
    return [
      ...(new Filter().getErrors(params, previousNodes, headers)),
      ...(new Replace().getErrors(params, previousNodes, headers))
    ];
  }

  getRuleFromGrid = (params) => {
    return {
      ...(new Filter().getRuleFromGrid(params)),
      ...(new Replace().getRuleFromGrid(params)),
      ...this.getRule()
    };
  }
}

export class DefaultValue extends Transformer {
  type = 'default-value';
  label = 'Default';
  icon = 'file-add';
  shortcut = 'control.shift.d';
  collapse = true;

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (isStrEmpty(params.destination)) { errors.push(new NodeError('destination', 'Destination Missing')); }
    return errors;
  }
}

export class Splitter extends Transformer {
  type = 'split';
  label = 'Split';
  icon = 'split-cells';
  shortcut = 'control.alt.s';
  collapse = true;

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (isStrEmpty(params.column)) { errors.push(new NodeError('column', 'Column Missing')); }
    if (isStrEmpty(params.separator)) { errors.push(new NodeError('separator', 'Separator Missing')); }
    return errors;
  }

  getRuleFromGrid(params) {
    const columns = GAPIColumnsInRange(params.api);
    return {
      ...this.getRule(),
      column: columns[0],
      separator: '-'
    };
  }
}

export class Calculator extends Transformer {
  type = 'calculator';
  label = 'Calculator';
  icon = 'calculator';
  shortcut = 'control.alt.c';

  getErrors = (params, previousNodes, headers) => {
    const errors = [];

    const previousHeaders: any[] = getPreviousHeader(headers, previousNodes);

    if (isStrEmpty(params.destination)) { errors.push(new NodeError('destination', 'Destination Missing')); }

    const formula: any[] = params.formula || []
    for (let token of formula) {
      if (token.type == 'column') {
        if (!previousHeaders.includes(token.value)) {
          errors.push(new NodeError('formula', `${token.value} does not exist.`))
        }
      }
    }

    return errors;
  }

}

export class FormatDate extends Transformer {
  type = 'format-date';
  label = 'Date Formatter';
  icon = 'calendar';
  shortcut = 'control.alt.d';

  getErrors = (params, previousNodes, headers) => {
    const errors = [];

    if (isStrEmpty(params.column)) { errors.push(new NodeError('column', 'column Missing')); }
    if (isStrEmpty(params.format)) { errors.push(new NodeError('format', 'Format Missing')); }

    return errors;
  }

}

export class GroupBy extends Transformer {
  type = 'groupby';
  label = 'Group By';
  icon = 'group';
  shortcut = 'control.alt.g';
  collapse: boolean = true;

  getErrors = (params, previousNodes, headers) => {
    const errors = [];

    const previousHeaders: any[] = getPreviousHeader(headers, previousNodes);
    if (isArrayEmpty(params.columns)) {
      errors.push(new NodeError('columns', 'Missing Column'))
    } else {
      for (const column of params.columns) {
        if (previousHeaders.indexOf(column) < 0) {
          errors.push(new NodeError('column ', `${column} does not exist`));
        }
      }
    }

    if (isArrayEmpty(params.groupKeys)) {
      errors.push(new NodeError('groupKeys', 'Missing Column'))
    } else {
      for (const column of params.groupKeys) {
        if (previousHeaders.indexOf(column) < 0) {
          errors.push(new NodeError('column ', `${column} does not exist`));
        }
      }
    }

    if (isStrEmpty(params.agg)) { errors.push(new NodeError('agg', 'Aggregation FUnction Missing')); }

    return errors;
  }


}

export class Hasher extends Transformer {
  type = 'hash';
  label = 'Hash';
  icon = 'barcode';
  shortcut = 'control.alt.h';
  collapse = false;

  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (!params.columns || (params.columns && params.columns.length === 0)) {
      errors.push(new NodeError('columns', 'Missing Column'));
    } else {
      const previousHeaders: any[] = getPreviousHeader(headers, previousNodes);
      for (const column of params.columns) {
        if (previousHeaders.indexOf(column) < 0) {
          errors.push(new NodeError('columns', `${column} does not exist`));
        }

      }
    }
    return errors;
  }

  getRuleFromGrid(params) {
    const columns = GAPIColumnsInRange(params.api);
    return {
      ...this.getRule(),
      columns
    };
  }
}

export class KeySelect extends Transformer {
  type = 'key_select';
  label = 'Format String';
  icon = 'key';
  shortcut = 'control.alt.k';
  collapse = false;


  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (isStrEmpty(params.destination)) { errors.push(new NodeError('destination', 'Destination Missing')); }
    return errors;
  }
}


export class Substring extends Transformer {
  type = 'substring';
  label = 'Substring';
  icon = 'field-string';
  shortcut = 'control.alt.s';
  collapse = false;


  getErrors = (params, previousNodes, headers) => {
    const errors = [];
    if (isStrEmpty(params.original_column)) { errors.push(new NodeError('original_column', 'Source Column Missing')); }
    return errors;
  }
}

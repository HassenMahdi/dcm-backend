import { isInDoubleFormat, isInIntegerFormat } from './strings.utils'

export class Parser {

    constructor() {
	}
	
    public static validate(formula){
		let tokens = formula
		let current = null
		let outStack = []

		while(current = tokens.shift()){
			const currentValue = current.value
			const currentType = current.type

			if(currentType == 'lp'){
				const paren = Parser.validate(tokens)[0]
				if (Array.isArray(paren)){
					outStack.push()
				} else {
					throw('Missing Parethesese')
				}
			} else if ( currentType == 'rp'){
				if(outStack.length == 0){
					throw('Empty Expression')
				}
				return [outStack]
			} else if( currentType == 'number' ){
				if(!isInIntegerFormat(currentValue) && !isInDoubleFormat(currentValue)){
					throw 'Unrecognized number'
				} else {
					const next = tokens[0]
					if (next && !['operator', 'lp', 'rp'].includes(next.type)){
						throw 'Missing operator'
					}
				}
				outStack.push(current)
			} else if (currentType == 'column') {
				const next = tokens[0]
					if (next && !['operator', 'lp', 'rp'].includes(next.type)){
						throw 'Missing operator'
				}

			} else if( currentType == 'operator'){
				const next = tokens[0]
				if(!next){
					throw 'Missing operand'
				} else if(next.type == 'operator'){
					throw 'Operator followed by another'
				}
				outStack.push(current)
			}
		}

		return outStack
	}
}
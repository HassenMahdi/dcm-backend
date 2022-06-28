


export function stateLabel(state){}
export function stateColor(state){
  if( Object.keys(RUN_STATES).includes(state) )  
    return RUN_STATES[state].color
  else
    return 'grey'
}

export const RUN_STATES = {
  'success':{label:'Success', color:'#339922'},
  'running':{label:'Running', color:'skyblue'},
  'failed':{label:'Failed', color:'#996464'},
  'queued':{label:'Queued', color:'lightblue'},
  'scheduled':{label:'Scheduled', color:'lightgrey'},
  'upstream_failed':{label:'Upstream Failed', color:'#fa8c16'},
}
enum State {
  OFFLINE,
  ONLINE,
  DELELTED
}

function getResult(status:any) {
  if(status == State.ONLINE) {
    return 'online'
  }else if(status == State.OFFLINE){
    return 'offline'
  }else if(status == State.DELELTED){
    return 'deleted'
  }
  return 'error'
}
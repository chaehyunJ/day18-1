function onMessage(event) { // 메시지를 받으면 수행하는 함수
	
	let className = ''
	if(JSON.parse(event.data).username == 'alarm'){
		className = 'alarm'
	}
	else if(JSON.parse(event.data).username == username){
		className = 'self'
	}
	else{
		className = 'other'
	}
	
	
	let tag = '<div>'
	tag += '<div class="name">' + JSON.parse(event.data).username + '</div>'
	tag += '<span class="message">' + JSON.parse(event.data).message + '</span>'
	tag += '</div>'
	textarea.innerHTML += tag

	// 글자수만큼 자리를 차지해서 span으로 한 것
	
	// 메시지가 길어지면 자동으로 아래로 스크롤
	textarea.scroll({
		top : textarea.scrollHeight,
		behavior : 'smooth'
	})
}


function onOpen(){
	const payload = {
			username : 'alarm',
			message : username + '님이 입장하셨습니다'
	}
}


function keyHandler(event) {
	if (event.key == 'Enter') { // 입력한 키가 엔터키이면 보내는 함수
		sendHandler(event)
	}

}

function sendHandler(event) {
	const message = send.value
	send.value = ''
	// 입력받을 값
	const payload = {
		username : username,
		message : message
	}
	ws.send(JSON.stringify(payload))
	send.focus()
}
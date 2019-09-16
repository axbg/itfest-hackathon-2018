const apiEndpoint = "http://localhost:3005";
const days = [ "", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

window.onload = function(){
    if(localStorage.getItem('isLeader') !== null){
        switchToNav();
    } else {
        document.getElementById('login').classList.toggle('hide');
    }
}


function login(){
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    axios.post(apiEndpoint + "/login", {email: email, password: password}, {withCredentials: true})
    .then((result) => {
        localStorage.setItem('isLeader', result.data.isAdmin);
        localStorage.setItem('group', result.data.group);
        switchToNav();
    }).catch((err) => {
        console.log('credentials not valid');
    })
}

function switchToNav(){
    document.getElementById("login").style.display = "none";

    if(localStorage.getItem("group") === null || localStorage.getItem("group") === "null"){
        document.getElementById("no-team").classList.toggle('hide');
    } else {
        document.getElementById("layout").classList.toggle('hide');
        navigation("Announcements");
    }
}

function navigation(panel){

    document.getElementsByClassName("navbar-toggle")[0].classList.toggle('toggled');
    switch(panel){
        case "Announcements":
            document.getElementsByClassName('navbar-brand')[0].textContent = panel;
            navigateToAnnouncements();
            document.documentElement.classList.remove('nav-open');
            break;
        case "Classes":
            document.getElementsByClassName('navbar-brand')[0].textContent = panel;
            navigateToClasses();
            document.documentElement.classList.remove('nav-open');
            break;        
        case "Timeline":
            document.getElementsByClassName('navbar-brand')[0].textContent = panel;
            navigateToTimeline();
            document.documentElement.classList.remove('nav-open');
            break;        
        case "Schedule":
            document.getElementsByClassName('navbar-brand')[0].textContent = panel;
            navigateToSchedule();
            document.documentElement.classList.remove('nav-open');
            break;        
        case "Group":
            document.getElementsByClassName('navbar-brand')[0].textContent = panel;
            navigateToGroup();
            document.documentElement.classList.remove('nav-open');
            break;
        case "Logout":
            localStorage.clear();
            document.cookie = 'session' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
            location.reload();
            break;
    }
}

function clearPanel(){
    document.getElementById('panel').innerHTML = "";
}

function navigateToAnnouncements(){

    let panel = document.getElementById('panel');
    clearPanel();

    if(localStorage.getItem("isLeader") === "1"){
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.innerText = "Add a new announcement"
        btn.setAttribute('data-toggle', 'modal');
        btn.setAttribute('data-target', '#modal');
        btn.onclick = (event) => announcementModal(event);
        panel.appendChild(btn);
    }

    axios.get(apiEndpoint + "/announcements", {withCredentials: true})
    .then((result) => {

        if(!result){
            let header = document.createElement('h1');
            header.innerText = "Nothing was posted yet";
            panel.appendChild(header);
        }else if(Array.isArray(result.data)){

            let ctx = document.createElement('div');
            for(let i=0; i<result.data.length; i++){

                let card = document.createElement('div');
                card.classList.add('card', 'col-12')
                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                let cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title', 'col-12')
                cardTitle.innerText = result.data[i].content;
                cardBody.appendChild(cardTitle);
                card.appendChild(cardBody);
                ctx.appendChild(card);

            }
            panel.appendChild(ctx);
        } else {
            let card = document.createElement('div');
            card.classList.add('card', 'col-12');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'col-12');

            cardTitle.innerText = result.data[0].content;
            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);
            panel.appendChild(card);

        }
    })
}

function acceptUser(event){

    axios.post(apiEndpoint + "/group/request/accept", {userId: event.target.getAttribute("user_id")}, {withCredentials:true})
    .then((result) => {
        console.log('user accepted');
    });
}

function groupModal(){

    let modal = document.getElementById("modal-body");
    let fragment = document.createDocumentFragment();
    modal.innerHTML = "";

    axios.get(apiEndpoint + "/group/request", {withCredentials: true})
    .then((result) => {
    
        for(let i=0;i<result.data.length; i++){
            let card = document.createElement('div');
            card.classList.add('card', 'col-12');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            cardBody.innerText = result.data[i].firstname + " - " + result.data[i].lastname + ": " + result.data[i].email;
            card.onclick = (event) => {acceptUser(event)};
            card.setAttribute('user_id', result.data[i].user_id);
            card.appendChild(cardBody);
            fragment.appendChild(card);
        }
        console.log(fragment);
        modal.appendChild(fragment);
    })
}

function timelineModal(){

    let modal = document.getElementById("modal-body");
    modal.innerHTML = "";

    let h4 = document.createElement("h4")
    h4.innerText = "Add a new announcement";
    modal.appendChild(h4);

    let input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.placeholder = "Type";

    let input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.placeholder = "Date";

    let input3 = document.createElement("input");
    input3.classList.add("form-control");
    input3.placeholder = "Hour";

    let input4 = document.createElement("button");
    input4.classList.add("form-control");
    input4.textContent = "Upload documents";

    let btn = document.createElement("input");
    btn.type = "submit";
    btn.classList.add("form-control");

    modal.appendChild(input1);
    modal.appendChild(input2);
    modal.appendChild(input3);
    modal.appendChild(input4);
    modal.appendChild(btn);

    
}

function announcementModal(){

    let modal = document.getElementById("modal-body");
    modal.innerHTML = "";

    let h4 = document.createElement("h4")
    h4.innerText = "Add a new announcement";
    modal.appendChild(h4);

    let input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.placeholder = "Announcement text";
    let btn = document.createElement("input");
    btn.type = "submit";
    btn.classList.add("form-control");

    modal.appendChild(input1);
    modal.appendChild(btn);
    
}

function createGroupModal(){

    let modal = document.getElementById("modal-body");
    modal.innerHTML = "";

    let modal = document.getElementById("modal-body");
    let h4 = document.createElement("h4")
    h4.innerText = "Create group";
    modal.appendChild(h4)

    let input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.placeholder = "Group name";
    let input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.placeholder = "Group year";
    let btn = document.createElement("input");
    btn.type = "submit";
    btn.classList.add("form-control");

    modal.appendChild(input1);
    modal.appendChild(input2);
    modal.appendChild(btn);
    
}

function joinGroupModal(){

    let modal = document.getElementById("modal-body");
    let fragment = document.createDocumentFragment();
    modal.innerHTML = "";

    let modal = document.getElementById("modal-body");
    let h4 = document.createElement("h4")
    h4.innerText = "Join group"
    modal.appendChild(h4)

    let input1 = document.createElement("input");
    input1.classList.add("form-control");
    input1.placeholder = "Group name";
    let btn = document.createElement("input");
    btn.type = "submit";
    btn.classList.add("form-control");

    modal.appendChild(input1);
    modal.appendChild(btn);
    
}

function navigateToGroup(){
    let panel = document.getElementById('panel');
    let fragment = document.createDocumentFragment();
    clearPanel();

    if(localStorage.getItem("isLeader") === "1"){
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.innerText = "User Requests";
        btn.setAttribute('data-toggle', 'modal');
        btn.setAttribute('data-target', '#modal');
        btn.onclick = (event) => groupModal(event);
        fragment.appendChild(btn);
    }

    let btn2 = document.createElement('button');
        btn2.classList.add('btn', 'btn-primary');
        btn2.innerText = "Leave group"
        fragment.appendChild(btn2);


    axios.get(apiEndpoint + "/user/group", {withCredentials: true})
    .then((result) =>{

        for(let i = 0; i<result.data.length; i++){
            let card = document.createElement('div');
            card.classList.add('card', 'col-12');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h6');
            cardTitle.classList.add('card-title', 'col-12');
            
            cardTitle.innerText = result.data[i].firstname + " - " + result.data[i].lastname + ": " + result.data[i].email;
            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);
            fragment.appendChild(card);
        }
        console.log(fragment);

        panel.appendChild(fragment);
    })
}

function compareSchedule(a,b) {
    if (a.day < b.day)
      return -1;
    if (a.day > b.day)
      return 1;
    if (a.hour < b.hour)
        return -1;
    if (a.hour > b.hour)
        return 1;
    return 1;
}

function navigateToSchedule(){
    let panel = document.getElementById('panel');
    let fragment = document.createDocumentFragment();
    clearPanel();

    axios.get(apiEndpoint + "/schedule", {withCredentials: true})
    .then((result) => {
        let schedule = result.data;

        schedule.sort((a, b) => compareSchedule(a,b));

        for(let i = 0; i<schedule.length; i++){
            let card = document.createElement('div');
            card.classList.add('card', 'col-12');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'col-12');
            
            cardTitle.innerText = days[schedule[i].day] + " - " + schedule[i].hour + ":00 - " + schedule[i].name;
            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);
            card.setAttribute('class_id', schedule[i].class_id);
            card.onclick = (event) => navigateToClass(event);
            fragment.appendChild(card);
        }

        panel.appendChild(fragment);
    })
};

function navigateToClass(event){
    let panel = document.getElementById('panel');
    let fragment = document.createDocumentFragment();
    clearPanel();

    axios.get(apiEndpoint + "/schedule/" + event.target.getAttribute('class_id'), {withCredentials: true})
    .then((result) => {
        let schedule = result.data;

        schedule.sort((a, b) => compareSchedule(a,b));

        for(let i = 0; i<schedule.length; i++){
            let card = document.createElement('div');
            card.classList.add('card', 'col-12');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'col-12');
            
            cardTitle.innerText = days[schedule[i].day] + " - " + schedule[i].hour + ":00 - " + schedule[i].name;
            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);
            card.setAttribute('class_id', schedule[i].class_id);
            fragment.appendChild(card);
        }

        panel.appendChild(fragment);
    })

}

function navigateToTimeline(){
    let panel = document.getElementById('panel');
    let fragment = document.createDocumentFragment();
    clearPanel();

    if(localStorage.getItem("isLeader") === "1"){
        let btn = document.createElement('button');
        btn.classList.add('btn', 'btn-primary');
        btn.innerText = "Add New Materials"
        btn.setAttribute('data-toggle', 'modal');
        btn.setAttribute('data-target', '#modal');
        btn.onclick = (event) => timelineModal(event);
        fragment.appendChild(btn);
    }

    axios.get(apiEndpoint + "/material", {withCredentials: true})
    .then((result) =>{
        for(let i=0; i<result.data.length; i++){

            console.log(result);

            let card = document.createElement('div');
            card.classList.add('card', 'col-12');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'col-12');
            
            cardTitle.innerText = result.data[i].name;
            cardBody.innerHTML= "<h4>"+ result.data[i].material.hour + ":00<br>" + result.data[i].material.date + '<br>' + 
            result.data[i].material.type + "</h4><br><a href='http://localhost:3005/public/sidebar-1.jpg' download='test.png' >download</a>";
            cardBody.appendChild(cardTitle);
            card.appendChild(cardBody);
            fragment.appendChild(card);

        }

        panel.appendChild(fragment);
    })
}

function register(){

    let email = document.getElementById('email');
    let password = document.getElementById('password');

    axios.post(apiEndpoint + "/user", {email: email, password: password})

}
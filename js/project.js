

let dataProject = [];

function submint(event){
    
    event.preventDefault()

    let inputName = document.getElementById("inputName").value;
    let inputStart = document.getElementById("start-date").date;
    let inputEnd = document.getElementById("end-date").date;
    let inputDescription = document.getElementById("description").value;
    let inputCheckBox = document.querySelectorAll("checkbox").checked;
    let inputContent = document.getElementById("image").files;

    inputContent = URL.createObjectURL(inputContent[0]);
    console.log("image", inputContent)

    console.log(inputName)
    console.log(inputDescription)
    console.log(inputContent)
    const blog  = {
        name: inputName,
        start: inputStart,
        end: inputEnd, 
        description: inputDescription,
        file: inputContent
    }

    dataProject.push(blog)
    console.log("dataProject", dataProject)
    renderBlog()

    
}


function renderBlog(){
    document.getElementById("contents").innerHTML = ``
    for(let i=0; i< dataProject.length; i++){
        
        document.getElementById("contents").innerHTML += `

        <div class="container-card ">
            <div class="card" >
                <div>
                    <img src="${dataProject[i].file}" alt="" class="img">
                    <a href="project.html" style=" color : black;">${dataProject[i].name}</a>
                    <p>${dataProject[i].description}</p>
    
                    <div style="padding-bottom: 15px;">
                        <img src="assets/icon/playstore.png" alt="playsotre" width="20px">
                        <img src="assets/icon/android.png" alt="androit" width="20px">
                        <img src="assets/icon/java.png" alt="java" width="20px">
                    </div>
                </div>
                <div style="text-align: center; padding-bottom: 20px;">
                    <input type="button" value="edit" style="background-color: black; color: #ffff; border-radius: 10px;width: 40%; height: 20px;">
                    <input type="button" value="delete" style="background-color: black; color: #ffff; border-radius: 10px;width: 40%;  height: 20px;">
                </div>
            </div>
        </div>
        `
    } 
    
}



// Navbar

let open = false 

function isOpen() {
    console.log(`gcaiycgauyov`)
    let navbarHp = document.getElementById("navbarHp")

    if(!open) {
        navbarHp.style.display = `flex`
        open = true
    } else {
        navbarHp.style.display = `none`
        open = false

    }
}


// project 
let dataProject = [];

function submint(event){
    
    event.preventDefault()

    let inputName = document.getElementById("inputName").value;
    let inputStart = document.getElementById("start-date").value;
    let inputEnd = document.getElementById("end-date").value;
    let inputDescription = document.getElementById("description").value;
    // let inputCheckBox = document.querySelectorAll('input[type="checkbox"]:checked');
    let inputContent = document.getElementById("image").files;
 
   

    inputContent = URL.createObjectURL(inputContent[0]);
    let tanggalMulai = new Date(inputStart)
    let tanggalSelesai = new Date(inputEnd) 

    let rentang = hitungRentang(tanggalMulai,tanggalSelesai)
    const blog  = {
        name: inputName,
        range: rentang,
        description: inputDescription,
        file: inputContent,
    }

    
    dataProject.push(blog)
    renderBlog()

}

function hitungRentang(tanggalMulai,tanggalSelesai){
    const startYear = tanggalMulai.getFullYear();
    const startMonth = tanggalMulai.getMonth();

    const endYear = tanggalSelesai.getFullYear();
    const endMonth = tanggalSelesai.getMonth();

    const Year = endYear - startYear ;
    const month = endMonth - startMonth;

    const totalDate = Year * 12 + month;
    
    return totalDate;
}
console.log(totalDate)

function renderBlog(){
    document.getElementById("contents").innerHTML = ``
    for(let i=0; i< dataProject.length; i++){
        
        document.getElementById("contents").innerHTML += `

        <div class="container-card ">
            <div class="card-project" >
                <div class="card-active">
                    <img src="${dataProject[i].file}" alt="" class="img-project">
                    <br>
                    <p>durasi : ${dataProject[i].range} bulan</p>
                    <br>
                    <a href="/project-detail" style=" color : black; text-decoration: none; ">${dataProject[i].name}</a>
                    <br>
                    <p class="p">${dataProject[i].description}</p>
    
                    <div style="padding-bottom: 15px;">
                        <img src="assets/icon/playstore.png" alt="playsotre" width="20px">
                        <img src="assets/icon/android.png" alt="androit" width="20px">
                        <img src="assets/icon/java.png" alt="java" width="20px">
                    </div>
                
                    <div style="text-align: center; padding-bottom: 20px;">
                        <input type="button" value="edit" style="background-color: black; color: #ffff; border-radius: 10px;width: 40%; height: 30px;">
                        <input type="button" value="delete" style="background-color: black; color: #ffff; border-radius: 10px;width: 40%;  height: 30px;">
                    </div>
                </div>
            </div>
        </div>
        `
    } 
    
}


function data(){
    const inputName = document.getElementById("inputNama").value
    const inputEmail = document.getElementById("inputEmail").value
    const inputPhone = document.getElementById("inputPhone").value
    const inputSubject = document.getElementById("inputSubject").value
    const inputMessege = document.getElementById("inputMessege").value
    
    if(inputName == ""){
        alert(`Nama harus di isi!`)
    } 
    else if (inputEmail == ""){
        alert(`Email harus di isi!`)
    }
    else if (inputPhone == ""){
        alert(`Nomer telephon harus di isi!`)
    }
    else if (inputSubject == ""){
        alert(`Subject harus di pilih!`)
    }
    else if (inputMessege == ""){
        alert(`Messege harus di isi`)
    }
    else {
        console.log(`Nama   : ${inputName}\nEmail   : ${inputEmail}\nPhone Number   : ${inputPhone}\nSubject    :${inputSubject}\nMessege   : ${inputMessege}`);
    }
    
    let a = document.createElement(`a`)
    a.href = `mailto:${inputEmail}?subject=${inputSubject}&body=${inputMessege}`
    a.click()
}
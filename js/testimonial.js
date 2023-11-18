

const dataInNetwork = new Promise((resolve, reject) => {
    
    const xhr = new XMLHttpRequest()
    xhr.open('GET','https://api.npoint.io/2639ea64fa6095b83df8', false)
    //get = method
    //url = alamat url untuk mengambil data dari internet
    //true = kondisi jika true dia akan berjalan secara pararel jka false dia akan blocking jika proses brlum selesai
    xhr.onload = () => {
        
        if(xhr.status === 200){
            // console.log("good",xhr.response)
            resolve(JSON.parse(xhr.response))
        }
        else {
            // console.log("bad",xhr.response)
        }
    }
    xhr.onerror = () => {//terjadi jika ada kesalahan dari user atau pengguna pada saat mengambil data dari internet
        console.log("conection error")
        reject()
    }
    xhr.send()
})

function tampilanHtml(item) {
    return  `
        <div class="layout-card">
        <div class="card">
            <div style="width: 80%;">
                <img src="${item.image}" alt="Bulan" class="img">
            </div>
            <div style="width: 80%">
                <p><i>${item.content}</i></p>
                <div style="text-align: right;">
                    <b>${item.author}</b>
                    <p>${item.rating}<i class="fa-solid fa-star"></i></p>
                </div>
            </div>
        </div>
    </div>
        `
        
}
async function refresh(){
    
    let testimonialHTML =``
    const card = await dataInNetwork
    card.forEach((item) => {
        testimonialHTML += tampilanHtml(item)
    })
    document.getElementById("testimonial").innerHTML = testimonialHTML
}
refresh()

async    function filter(rating){
    let testimonialHTML = ``
    const card = await dataInNetwork
    const filterActive = card.filter((item) =>{
        return item.rating === rating
    })

    if(filterActive.length === 0 ){
        testimonialHTML = `<h2>Not Found!!</h2>`
    } else {
        filterActive.forEach((item) => {
            testimonialHTML += tampilanHtml(item)
        })
    }
    document.getElementById("testimonial").innerHTML = testimonialHTML
    
}



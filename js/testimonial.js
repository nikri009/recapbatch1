// class Testimonial {
//     constructor(image, content, author, rating) {
//         this.image = image
//         this.content = content
//         this.author = author
//         this.rating = rating
//     }

//     cardTestimonial() {
//         return `
//         <div class="layout-card">
//         <div class="card">
//             <div style="width: 80%;">
//                 <img src="${this.image}" alt="Bulan" class="img">
//             </div>
//             <div style="width: 80%">
//                 <p><i>${this.content}</i></p>
//                 <div style="text-align: right;">
//                     <b>${this.author}</b>
//                 </div>
//             </div>
//         </div>
//     </div>
//         `
//     }
// }

// const card1 = new Testimonial( "https://media.istockphoto.com/id/1170965884/id/foto/wanita-sukses-mendaki-siluet-di-pegunungan-motivasi-dan-inspirasi-saat-matahari-terbenam.jpg?s=1024x1024&w=is&k=20&c=5Uh833uzpThXruCvvI_DvvgVsckskfGfPsDDVsMh9UE=",
//                                 "waktu tidak bisa di beli, jadi gunakan waktumu dengan sebaik mungkin",
//                                 "- by me")
// const card2 = new Testimonial( "https://cdn.pixabay.com/photo/2014/10/26/17/19/fisherman-504098_1280.jpg",
//                                 "Dalam memancing, kesabaran bukan hanya tentang menunggu ikan, tetapi juga tentang menunggu momen yang tepat dalam hidup",
//                                 "- another person")
// const card3 = new Testimonial( "https://cdn.pixabay.com/photo/2017/11/03/18/26/man-2915187_1280.jpg",
//                                 "Kesendirian bukanlah kelemahan, melainkan kesempatan untuk menemukan kekuatan dan kebijaksanaan di dalam diri sendiri",
//                                 "- my brother")


const card = [
    {
        image: "https://media.istockphoto.com/id/1170965884/id/foto/wanita-sukses-mendaki-siluet-di-pegunungan-motivasi-dan-inspirasi-saat-matahari-terbenam.jpg?s=1024x1024&w=is&k=20&c=5Uh833uzpThXruCvvI_DvvgVsckskfGfPsDDVsMh9UE=",
        content: "waktu tidak bisa di beli, jadi gunakan waktumu dengan sebaik mungkin",
        author: "- by me",
        rating: 5
    },
    {
        image: "https://cdn.pixabay.com/photo/2014/10/26/17/19/fisherman-504098_1280.jpg",
        content: "Dalam memancing, kesabaran bukan hanya tentang menunggu ikan, tetapi juga tentang menunggu momen yang tepat dalam hidup",
        author: "- another person",
        rating: 3
    },
    {
        image: "https://cdn.pixabay.com/photo/2017/11/03/18/26/man-2915187_1280.jpg",
        content: "Kesendirian bukanlah kelemahan, melainkan kesempatan untuk menemukan kekuatan dan kebijaksanaan di dalam diri sendiri",
        author: "- my brother",
        rating: 4
    },
    {
        image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        content: "Belajarlah selagi bisa, karena umur gk ada yang tau.",
        author: "- ryan",
        rating: 5
    }
]

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
function refresh(){
    
    let testimonialHTML =``
    card.forEach((item) => {
        testimonialHTML += tampilanHtml(item)
    })
    document.getElementById("testimonial").innerHTML = testimonialHTML
}
refresh()

function filter(rating){
    let testimonialHTML = ``
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



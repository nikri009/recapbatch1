class Testimonial {
    constructor(image, content, author) {
        this.image = image
        this.content = content
        this.author = author
    }

    cardTestimonial() {
        return `
        <div class="layout-card">
        <div class="card">
            <div style="width: 80%;">
                <img src="${this.image}" alt="Bulan" class="img">
            </div>
            <div style="width: 80%">
                <p><i>${this.content}</i></p>
                <div style="text-align: right;">
                    <b>${this.author}</b>
                </div>
            </div>
        </div>
    </div>
        `
    }
}

const card1 = new Testimonial( "https://media.istockphoto.com/id/1170965884/id/foto/wanita-sukses-mendaki-siluet-di-pegunungan-motivasi-dan-inspirasi-saat-matahari-terbenam.jpg?s=1024x1024&w=is&k=20&c=5Uh833uzpThXruCvvI_DvvgVsckskfGfPsDDVsMh9UE=",
                                "waktu tidak bisa di beli, jadi gunakan waktumu dengan sebaik mungkin",
                                "- by me")
const card2 = new Testimonial( "https://cdn.pixabay.com/photo/2014/10/26/17/19/fisherman-504098_1280.jpg",
                                "Dalam memancing, kesabaran bukan hanya tentang menunggu ikan, tetapi juga tentang menunggu momen yang tepat dalam hidup",
                                "- another person")
const card3 = new Testimonial( "https://cdn.pixabay.com/photo/2017/11/03/18/26/man-2915187_1280.jpg",
                                "Kesendirian bukanlah kelemahan, melainkan kesempatan untuk menemukan kekuatan dan kebijaksanaan di dalam diri sendiri",
                                "- my brother")


const data = [card1,card2,card3]
let testimonialHTML =``
for (let i=0; i<data.length; i++){
    testimonialHTML += data[i].cardTestimonial()
}
document.getElementById("testimonial").innerHTML = testimonialHTML

let open = false 
function isOpen() {
    
    let navbarHp = document.getElementById("navbarHp")

    console.log("kontol")
    if(!open) {
        navbarHp.style.display = `flex`
        open = true
    } else {
        navbarHp.style.display = `none`
        open = false

    }
}
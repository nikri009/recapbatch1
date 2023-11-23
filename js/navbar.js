
let open = false 
function isOpen() {
    
    let navbarHp = document.getElementById("navbarHp")

    if(!open) {
        navbarHp.style.display = `flex`
        open = true
    } else {
        navbarHp.style.display = `none`
        open = false

    }
}
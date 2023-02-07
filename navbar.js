const navhamburger = document.querySelector(".nav-hamburger")
    const navHide = document.querySelector(".navhide")

    navhamburger.addEventListener('click',()=>{
        navHide.classList.toggle('mobile-menu')
    })
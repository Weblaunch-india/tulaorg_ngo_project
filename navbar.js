const navhamburger = document.querySelector(".nav-hamburger")
    const navHide = document.querySelector(".navhide")

    navhamburger.addEventListener('click',()=>{
        navHide.classList.toggle('mobile-menu')
    })

var a;
function show_hide()
{
    if(a==1)
    {
        document.getElementById("home").style.display="inline";
        return a=0;
    }
    else
    {
        document.getElementById("home").style.display="none";
        return a=1;
    }
}    
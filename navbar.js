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
        document.body.style.overflow = 'scroll';
        // document.style.overflowY = "hidden";
        return a=0;
    }
    else
    {
        document.getElementById("home").style.display="none";
        document.body.style.overflow = 'hidden';
        return a=1;
    }
}    



$(document).ready(function(){
    $(window).scroll(function(){
    if($(window).scrollTop() > 20 ){
    $('.navs1').addClass('navbar-scroll');
    }
    else{
    $('.navs1').removeClass('navbar-scroll');
    }
    });
    });
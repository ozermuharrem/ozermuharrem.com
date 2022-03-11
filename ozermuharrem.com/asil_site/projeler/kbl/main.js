var proje = [
    {
        adi : "Nur Hayat",
        image:'projeler/01-nur-hayat/nur-hayat-01.jpg',
        alanMk : 10000,
        link : 'projeler/01-nur-hayat/nur-hayat.html'
    },
    {
        adi : "Dönence",
        image:'projeler/02-dönence/dönence-01.jpg',
        alanMk : 5000,
        link :'projeler/02-dönence/dönence.html'
    },
    {
        adi : "Ahmet Hamdi Bey",
        image:'projeler/03-ahmet-hamdi-bey/ahmet-hamdi-bey-01.jpg',
        alanMk : 7000,
        link :'projeler/03-ahmet-hamdi-bey/ahmet-hamdi-bey.html'
    }
]; // dizilep projeler ile ilgili bilgiler oluşturuldu

var index = 0; // dizinin elemenlarına ulaşacağız  
var slaytSayi = proje.length; // proje sayisi

var interval;

var zamanAyar = {
    süre : '5000', // 5 san.
    random : false
};

// slaytShow(index);

init(zamanAyar);

/* sol ve sağ iconlar için clik event oluşturma */ 

document.querySelector('.fa-angle-left').addEventListener('click',function(){
    index--;
    slaytShow(index);
    console.log(index);
});
document.querySelector('.fa-angle-right').addEventListener('click',function(){
    index++;
    slaytShow(index);
    console.log(index);
}); 
document.querySelectorAll('.angle').forEach(function(item){
    item.addEventListener('mouseenter',function(){
        clearInterval(interval);
    })
});
document.querySelectorAll('.angle').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(zamanAyar);
    })
})

function init(zamanAyar){
    var önceki ;
    interval=setInterval(function(){

        if(zamanAyar.random){
            do{
                index = Math.floor(Math.random() * slaytSayi);
            }
            while(index == önceki)
            önceki = index;
        }
        else{
            if(slaytSayi == index+1){
                index = -1;
            }
            slaytShow(index);
            console.log(index);
            index++;
        }
       // console.log(index);
        slaytShow(index);

    },zamanAyar.süre) 
}

function slaytShow(i){
    index = i ;

    if(i<0){
        index = slaytSayi - 1;
    }
    if(i>= slaytSayi){
        index = 0;
    }
    document.querySelector('.card-title').textContent = proje[index].adi;
    document.querySelector('.card-img').setAttribute('src',proje[index].image);
    document.querySelector('.card-link').setAttribute('href',proje[index].link);
}

var tarih;

tarih = new Date(); 

document.querySelector('.tarih').textContent=tarih.getFullYear();

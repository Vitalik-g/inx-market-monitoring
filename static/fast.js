toastr.options = toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "3000000",
    "hideDuration": "10000000000000",
    "timeOut": 0,
    "extendedTimeOut": 0,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "tapToDismiss": false
  }



setInterval(()=>{
    $.get( "/data", function( data ) {
        
        data.map((element)=>{
            let htmlElement = $(`[data-name = "${element.name}"]`)
            if(htmlElement.length == 0){
                htmlElement = $('#unused .flex-container').clone().appendTo("#container");
                htmlElement.attr("data-name", element.name)
                htmlElement.children('.name-book').attr('href',element.url)
                htmlElement.children('.name-book').text(element.name)
                htmlElement.children('.graf-container').html(element.graf)
                // console.log(newHtmlElement.children('.info-box').children('.buy-order'));
                htmlElement.children('.info-box').children('.buy-order').html(element.buyBookSize)
                htmlElement.children('.info-box').children('.sell-order').html(element.sellBookSize)
            }else{
                htmlElement.attr("data-name", element.name)
                htmlElement.children('.name-book').attr('href',element.url)
                htmlElement.children('.name-book').html(element.name + ' - <sapn class="price">' + element.price+'</span>')
                htmlElement.children('.graf-container').html(element.graf)

                htmlElement.children('.info-box').children('.buy-order').html(element.buyBookSize)
                htmlElement.children('.info-box').children('.sell-order').html(element.sellBookSize)
            }
            checkWork(htmlElement,element)
        })
    });
},1000)
function checkWork(htmlElement,data){
    if(data.buyBookSize <3 || data.sellBookSize < 3){
        htmlElement.attr('data-fine', parseInt(htmlElement.attr('data-fine')) +1)
    }else{
        if(parseInt(htmlElement.attr('data-fine'))<0){
            
        }else{
            htmlElement.attr('data-fine', 0)
        }
    }
    if(parseInt(htmlElement.attr('data-fine')) == 600 || parseInt(htmlElement.attr('data-fine')) == 620 || parseInt(htmlElement.attr('data-fine')) == 640){
        marketProblem(data.name)
    }

}


function marketProblem(market){
     toastr["error"](`???? ?????????????? ${market} ???????? ?????????????????? ???????????? ?????? 10????   <br /><br />  <button onclick='disableAlert(event,"${market}",0)' type="button" class="btn clear">????????????????</button><br /><br />  <button onclick='disableAlert(event,"${market}",-9999999)' type="button" class="btn clear">???????????? ?? ???? ????????????????????</button>`, "???????????????? ?? ????????????????")
     sound()
}
function disableAlert(event,market,num){
    let htmlElement = $(`[data-name = "${market}"]`)
    htmlElement.attr('data-fine', num)
    $(event.path[2]).find('.toast-close-button').trigger("click")
    // $(event.path[2]).remove()
}
function sound() {
    var audio = new Audio(); // ?????????????? ?????????? ?????????????? Audio
    audio.src = 'sound.mp3'; // ?????????????????? ???????? ?? ?????????? "??????????"
    audio.autoplay = true; // ?????????????????????????? ??????????????????
  }

setInterval(()=>{
    $.get( "/data", function( data ) {
        
        data.map((element)=>{
            let htmlElement = $(`[data-name = "${element.name}"]`)
            if(htmlElement.length == 0){
                let newHtmlElement = $('#unused .flex-container').clone().appendTo("#container");
                newHtmlElement.attr("data-name", element.name)
                newHtmlElement.children('.name-book').text(element.name)
                newHtmlElement.children('.graf-container').html(element.graf)
                console.log(newHtmlElement.children('.info-box').children('.buy-order'));
                newHtmlElement.children('.info-box').children('.buy-order').html(element.buyBookSize)
                newHtmlElement.children('.info-box').children('.sell-order').html(element.sellBookSize)
            }else{
                htmlElement.attr("data-name", element.name)
                htmlElement.children('.name-book').html(element.name + ' - <sapn class="price">' + element.price+'</span>')
                htmlElement.children('.graf-container').html(element.graf)

                htmlElement.children('.info-box').children('.buy-order').html(element.buyBookSize)
                htmlElement.children('.info-box').children('.sell-order').html(element.sellBookSize)
            }
            
            
        })
         

    });
},1000)

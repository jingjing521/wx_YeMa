// 发口碑
 

 $('.car_push').on('click',function(){
 	var carType = $('.car_publicPraise .car_type_text').val();
 	var car = $('#demo5').val();
 	var content = $('#textarea').val();
 	// window.location.href="carPraise.html?type="+carType+'&car='+car+'&content='+content;
 	 
 })


 $(function(){
 	
    // 对比
 	    $('.carModel_option').on('click','.add',function(){
		   $(this).text('已加入').addClass('complete');
		   var car = $(this).parent().parent().prev().children(":first").html();
		   console.log( $('.type_contarast_add2 i').html() );
		})
    // 选择车型
    
 //    $('#demo7').on('click',function(){
 //    	console.log(  );
 //    	var val = $('#demo7').val();
 //    	$('<li><div class="behind"><a href="#" class="ui-btn delete-btn">Delete</a></div><a href="" class="con">野马 T70 2016款 舒适型 1.8L+5MT</a></li>').appendTo($('.swipe-delete'))
 //    }) 
 })

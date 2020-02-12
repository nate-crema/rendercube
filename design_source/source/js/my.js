$(document).ready(function() {
    var status_rendering_num = document.getElementById("rendering_progress").textContent.split(":").pop();
    console.log(status_rendering_num);
    

    for(var i = 0; i<=status_rendering_num-1; i++) {
        $('.rendering_lineup_' + i).css('left', 100+500*i);
    }
    
})
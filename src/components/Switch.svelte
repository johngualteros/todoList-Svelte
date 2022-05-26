<script>
    import {darkmode} from '../store/Store.js';
    function handleClick(){
        darkmode.update(darkmode=> !darkmode);

        fetch("http://localhost:3000/darkmode",{
            method:"POST",
            body:JSON.stringify({darkmode: $darkmode}),
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            }
        }).then(response=>response.json()).then(res=>console.log(res));
        
    }
</script>
<div class="Switch">
    <div class={$darkmode?'switch-container on':'switch-container'}>
        <button class="circle" on:click={handleClick}></button>
    </div>
</div>
<style>
    .switch-container{
        background-color:#ccc;
        width:50px;
        height:25px;
        border-radius:30px;
        margin: 0 10px;
    }
    .circle{
        cursor:pointer;
        width: 25px;
        height: 25px;
        border-radius:50%;
        transition: all 0.2s;
    }
    .on .circle{
        margin-left:25px;
    }
    .on{
        background-color:rgb(24, 13, 109);
    }
</style>
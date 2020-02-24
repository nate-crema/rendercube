<template>
    <div class="sel_zip_upload module select_area" v-on:click="load_b_zip_upload()">
        <div class="img">
            <img src="">
        </div>
        <p class="type">프로젝트 ZIP파일 업로드</p>
        <p class="explain_type">After Effect, Premiere의 Dependencies 기능을 사용해<br>소스 및 프로젝트를 묶은 zip파일을 업로드합니다</p>
    </div>
</template>

<script>

export default {
    methods: {
        load_b_zip_upload: function() {
            console.log('zip_upload function clicked');

            // infos.project_select = "new";
            // infos.stage = "b_upload_zip";
            // console.log(infos);

            this.$remove_stage('.sel_zip_upload', '.sel_load_file');
            this.$change_title('프로젝트 ZIP파일 업로드', '');
            this.$load_stage('.zip_upload_form');
        }
    }
}
</script>

<style>
.sel_zip_upload {
    width: 300px;
    height: 400px;
    position: relative;
    top: 0px;
    left: 150px;
}
.sel_zip_upload .type {
    
}
</style>

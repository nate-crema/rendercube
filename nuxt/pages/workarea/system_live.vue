<template>
    <div class="system_live">
        <div class="area_title">            
            <p class="title">시스템 사용량</P>
            <p class="subtitle">사용중인 서버의 실시간 상태와 기능별 메인서버의 상태를 확인할 수 있습니다</p>
            <div class="line_a line_title"></div>
            <p class="comment">참고: 다중서버의 경우 메인 렌더링 서버의 정보만 표시됩니다</p>
        </div>
        <div class="modules">
            <cpu-usage></cpu-usage>
            <ram-usage></ram-usage>
            <gpu-usage></gpu-usage>
            <ftp-usage></ftp-usage>
            <system-info></system-info>
        </div>
    </div>
</template>

<script>

import cpu_usage from '~/components/modules/sys_live/cpu_usage.vue'
import ram_usage from '~/components/modules/sys_live/ram_usage.vue'
import gpu_usage from '~/components/modules/sys_live/gpu_usage.vue'
import ftp_usage from '~/components/modules/sys_live/ftp_usage.vue'
import sys_info from '~/components/modules/sys_live/sys_info.vue'

export default {
    components: {
        "cpu-usage": cpu_usage,
        "ram-usage": ram_usage,
        "gpu-usage": gpu_usage,
        "ftp-usage": ftp_usage,
        "system-info": sys_info
    }
}
</script>

<style>

/* system_live */


.modules {
    width: 100%;
    height: 100%;
    overflow: scroll;
}

/* modules_common_css */

.modules_title {
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.48;
    letter-spacing: normal;
    text-align: left;
    color: #000000;
    margin-bottom: 34px;
    padding-top: 10px;
    padding-left: 40px;
    z-index: 2;
}
.modules_sys {
    position: relative;
    width: 230px;
    height: 240px;
}
.title_cover .title {
    font-size: 20px;
    font-weight: 500;
    padding-left: 30px;
    padding-top: 20px;
    color: rgb(0, 0, 0);
}
</style>

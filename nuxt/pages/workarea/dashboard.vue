<template>
    <div class="dashboard">
        <div class="area_title">            
            <p class="title fadeInDown time_1s animated">Dashboard</P>
            <div class="line_a line_title"></div>
        </div>
        <div class="modules">
            <server-group-preview class="fadeIn delay_0_4s time_1s animated"></server-group-preview>
            <storage-status class="fadeIn delay_0_5s time_1s animated"></storage-status>
            <system-usage class="fadeIn delay_0_6s time_1s animated"></system-usage>
            <render-standby class="fadeIn delay_0_7s time_1s animated"></render-standby>
        </div>
    </div>
</template>

<script>

import sgpv from '~/components/modules/dashboard/sgpv.vue'
import ststat from '~/components/modules/dashboard/ststat.vue'
import sysusage from '~/components/modules/dashboard/sysusage.vue'
import renderstb from '~/components/modules/dashboard/renderstb.vue'

export default {
    components: {
        "server-group-preview": sgpv,
        "storage-status": ststat,
        "system-usage": sysusage,
        "render-standby": renderstb
    }
}
</script>

<style>
.dashboard {
    width: 100%;
    height: 100%;
}
.modules {
    width: 100%;
    height: 100%;
}
</style>

<template>
    <v-card>
        <Header />
        <Sidebar />
        <Three />
    </v-card>
</template>
<script>
import Header from '@/components/ui/Header.vue';
import Sidebar from '@/components/ui/Sidebar.vue';
import Three from '@/components/threeContainer/Three.vue';
export default {
    name: "defaultLayout",
    data() {
        return {

        }
    },
    components: {
        Header,
        Sidebar,
        Three
    }
}
</script>
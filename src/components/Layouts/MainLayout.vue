<template>
  <div class="main-layout">
      <div class="header-bar">
         <div class="header-pane">
            <Header />
         </div>
      </div>
      <div class="middle-pane">
          <div class="side-bar">
            <Sidebar/>
          </div>
          <div class="content-body">
              <slot name="mainContent" />
          </div>
      </div>
  </div>
</template>

<script>
import Header from '@/components/ModuleComponents/Header'
import Sidebar from '@/components/ModuleComponents/Sidebar'
export default {
    name: "MainLayout",
    components: {
        Header,
        Sidebar
    }
}
</script>

<style lang="scss">
.header-bar {
    border-bottom: 1px solid #dadce0;
    padding: 0 12px;
    .header-pane {
        box-sizing: border-box;
        width: 100%;
        box-shadow: none;
        height: 64px;
        .my-header {
            width: 100%
        }
    }
}
.middle-pane {
    height: calc(100vh - 65px);
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    .side-bar {
        width: 256px;
        padding: 20px 0;
        height: 100%;
        .sidebar {
            height: 100%;
        }
    }
    .content-body {
        width: calc(100% - 256px);
        max-height: 100%;
        overflow: auto;
    }
}

</style>
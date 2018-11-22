<template>
    <div>
        <Row :gutter="16">
            <Col :span="12">
                <Card>
                    <p slot="title">
                        <Icon type="ios-analytics" />
                        系统前台：基于vue全家桶实现
                    </p>
                    <a href="https://github.com/garsonguo/x-auth" target="_blank" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        跳转到Github
                    </a>
                    <p v-for="item of front">{{item}}</p>
                </Card>
            </Col>
            <Col :span="12">
                <Card>
                    <p slot="title">
                        <Icon type="ios-cloud-circle" />
                        系统后台：基于koa2+lowdb实现
                    </p>
                    <a href="https://github.com/garsonguo/x-node" target="_blank" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        跳转到Github
                    </a>
                    <p v-for="item of end">{{item}}</p>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      front: ["vue-cli3", "iview", "vue全家桶"],
      end: ["koa2", "lowdb", "RBAC基于角色的全新访问控制"]
    };
  }
};
</script>

<style scoped>
</style>
<template>
<div class="articles">
  <!-- 第一个card -->
  <el-card class="box-card">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <MyBreadcrumb>
        内容管理
      </MyBreadcrumb>
    </div>
    <!-- form表单区域 -->
    <div class="text item">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="0">全部</el-radio>
            <el-radio label="1">草稿</el-radio>
            <el-radio label="2">待审核</el-radio>
            <el-radio label="3">审核通过</el-radio>
            <el-radio label="4">审核失败</el-radio>
            <el-radio label="5">已删除</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="form.channel_id" placeholder="请选择频道">
            <el-option v-for="item in channels" :key= 'item.id' :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>

      </el-form>
    </div>
  </el-card>

  <!-- 第二个card -->
  <el-card class="box-card">
    <!-- 头部信息总条数 -->
    <div slot="header" class="clearfix">
      <span>根据筛选条件共查询到{{total_count}}条结果:</span>
    </div>
    <!-- 数据表格展示 -->
    <div class="text item">
      <el-table
        v-loading="isLoading"
        :data="articles"
        style="width: 100%"
        align = 'center'
        >
        <el-table-column
          align="center"
          label="封面">
          <template v-slot:default = 'obj'>
            <el-image
            :src="obj.row.cover.images[0]"
            style="width:150px;height:100px"
            fit='cover'>
              <div slot="error" class="image-slot">
                <img src="~@/assets/error.gif" style="width:150px;height:100px" alt="">
              </div>
            </el-image>

          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="title"
          label="标题"
          width="180">
        </el-table-column>

        <el-table-column
          align="center"
          prop="status"
          label="状态">
          <template v-slot:default = 'obj'>
            <el-tag v-if="obj.row.status === 0">草稿</el-tag>
            <el-tag v-if="obj.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="obj.row.status === 1" type="info">待审核</el-tag>
            <el-tag v-if="obj.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="obj.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="pubdate"
          label="发布时间">
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template v-slot:default = 'obj'>
            <!-- 椭圆形的原因是:里面写了字,所以盒子是长方形了,把字删除,只保留icon字体就可以实现是圆形了 -->
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="del(obj.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change = 'handleCurrentChange'
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :total=total_count>
      </el-pagination>
    </div>
  </el-card>
</div>

</template>

<script>
import { reqGetArticles, reqGetChannels } from '@/api/articles'
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
export default {
  name: 'articles',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      isLoading: true,
      form: {
        region: '',
        date: [],
        status: null,
        channel_id: null
      },
      articles: [],
      total_count: 0,
      currentPage: 1,
      channels: []
    }
  },
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  methods: {
    del (id) {
      console.log(id)
    },
    handleCurrentChange (index) {
      console.log(index)
      this.currentPage = index
      this.loadArticles()
    },
    loadArticles () {
      const [beginPudate, endPubdate] = this.form.date || []
      reqGetArticles({
        page: this.currentPage,
        begin_pubdate: beginPudate,
        end_pubdate: endPubdate,
        status: this.form.status,
        channel_id: this.form.channel_id || null
      }).then(res => {
        console.log(res)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
        this.isLoading = false
      })
    },
    search () {
      this.currentPage = 1
      this.loadArticles()
    },
    loadChannels () {
      reqGetChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    }

  }

}
</script>

<style lang = 'less' scoped>
  .articles {

    .box-card{
      margin-bottom: 20px;
      .el-pagination{
        margin-top: 20px;
      }
    }
  }

</style>

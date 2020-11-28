<template>
<div class="articles">
  <!-- 第一个card -->
  <el-card class="box-card">
    <!-- 头部区域 -->
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- form表单区域 -->
    <div class="text item">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="结束日期" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>

      </el-form>
    </div>
  </el-card>

  <!-- 第二个card -->
  <el-card class="box-card">
    <!-- 头部信息总条数 -->
    <div slot="header" class="clearfix">
      <span>根据筛选条件共查询到167421条结果:</span>
    </div>
    <!-- 数据表格展示 -->
    <div class="text item">
      <el-table
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
    </div>
  </el-card>
</div>

</template>

<script>
import { reqGetArticles } from '@/api/articles'
export default {
  name: 'articles',
  data () {
    return {
      form: {
        region: '',
        date1: '',
        date2: ''
      },
      articles: []
    }
  },
  created () {
    reqGetArticles().then(res => {
      console.log(res)
      this.articles = res.data.data.results
    })
  },
  methods: {
    del (id) {
      console.log(id)
    }
  }
}
</script>

<style lang = 'less' scoped>
  .articles {

    .box-card{
      margin-bottom: 20px;
    }
  }

</style>

<template>
	<div>
		<el-row>
			<el-col :span="4">
				<span style="font-family: 'Source Sans Pro', sans-serif;font-size:24px;color:black">备案注册申请</span>
			</el-col>
			<el-col :span="4" :offset="16">
				<el-breadcrumb separator-class="el-icon-arrow-right">
				  	<el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
				    <el-breadcrumb-item>备案注册申请</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			
		</el-row>

		<el-row>
			<el-form :inline="true" label-position="right" label-width="70px"  size="mini" :model="queryFormInfo">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<el-form-item label="处理状态">
					    <el-select v-model="queryFormInfo.status">
					    	<el-option label="待执勤人员审核" value="0"></el-option>
					        <el-option label="通过" value="1"></el-option>
					        <el-option label="未通过" value="2"></el-option>
					        <el-option label="未备案" value="5"></el-option>
					        <el-option label="已失效" value="6"></el-option>
					        <el-option label="查询全部" value=""></el-option>
					    </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<el-form-item label="所属公司">
					    <el-select v-model="queryFormInfo.company">
					    	<el-option label="查询全部" value=""></el-option>
					        <el-option v-for="company in companyList" :label="company.companyName" :value="company.companyName" ></el-option>
					       
					    </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<el-form-item label="所属港口">
					    <el-select v-model="queryFormInfo.portId">
					        <el-option label="查询全部" value=""></el-option>
					        <el-option v-for="port in portList" :label="port.portName" :value="port.id"></el-option>
					    </el-select>
					</el-form-item>
				</el-col>
				
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
					<el-form-item label="身份证号">
					    <el-input v-model="queryFormInfo.identityCard"></el-input>
					</el-form-item>
				</el-col>

				<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
					<el-form-item>
					    <el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>	
				</el-col>
			</el-form>
		</el-row>

		<el-row>
			<el-table :data="tableData" :stripe="true" size="small" :highlight-current-row="true" @row-dblclick="dblClick($event)">
			    <el-table-column prop="name" label="姓名" min-width="60px">
			    </el-table-column>
			    <el-table-column prop="identityCard" label="身份证号" min-width="180px">
			    </el-table-column>
			    <el-table-column prop="companyName" label="所属公司" min-width="180px">
			    </el-table-column>
			     <el-table-column prop="sex" label="性别">
			    </el-table-column>
			     <el-table-column prop="duty" label="职位">
			    </el-table-column>
			     <el-table-column prop="status" label="状态">

			     	<template slot-scope="scope">
			     			<span>{{scope.row.status == '0'?'待执勤人员审核':(
			     				scope.row.status == '1'?'通过':(
			     											scope.row.status == '2'?'未通过':(
			     											scope.row.status == '5'?'未备案':(
			     											scope.row.status == '6'?'已失效':'--'
			     											))))}}</span>
			     	</template>
			    </el-table-column>
			    <el-table-column prop="serviceCode" label="批准人">
			    </el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<el-pagination background layout="prev, pager, next" :page-size="6"  :total="allPageData.total" @current-change="selectCurrentPage($event)"></el-pagination>
		</el-row>

		<!-- Form   表单弹框-->
		<!-- 	<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
		
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="活动名称" :label-width="formLabelWidth">
		      <el-input v-model="form.name" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="活动区域" :label-width="formLabelWidth">
		      <el-select v-model="form.region" placeholder="请选择活动区域">
		        <el-option label="区域一" value="shanghai"></el-option>
		        <el-option label="区域二" value="beijing"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog> -->
	</div>
</template>

<script>
	import {getCompanys,getPorts,getUsersForPage} from '@/api'
	export default{
		data:function(){
			return {
				tableData:[
				{
			"id": "2292289710277632",
			"partyId": "22910420401858581747",
			"name": "马蒙怀",
			"identityCard": "320107198705150318",
			"phone": "17712418705",
			"city": null,
			"cityType": null,
			"remarkMatter": "船舶服务",
			"frontCard": "/upload/20170802/2292289127351296.jpg",
			"behindCard": "/upload/20170802/2292289225032704.jpg",
			"handCard": "/upload/20170802/2292289368802304.jpg",
			"relationshipProve": "/upload/20170802/2292289513391104.jpg",
			"companyId": null,
			"companyName": "南京纪发船舶清仓残油回收站",
			"authority": "1,b0,b1,b4,",
			"duty": "业务员",
			"sex": "男",
			"openid": "oxwWywVzmNgg7uE1LaALrv2m12a4",
			"nationality": null,
			"serviceCode": "武彬彬",
			"status": 1,
			"reply": "通过",
			"portId": "1835151452341248",
			"applyTime": "2017-08-02 16:53:22",
			"birthday": "1987-05-15",
			"startTime": "2017-08-02 16:52:28",
			"endTime": "2017-12-31 23:59:59",
			
			"portAuth": null,
			"remindTag": false
			},
				{
			"id": "2292488092075008",
			"partyId": "22919424557066334802",
			"name": "葛峰",
			"identityCard": "320623198411071670",
			"phone": "18052041348",
			"city": null,
			"cityType": null,
			"remarkMatter": "业务需要",
			"frontCard": "/upload/20170803/2293693720921088.jpg",
			"behindCard": "/upload/20170803/2293693912794112.jpg",
			"handCard": "/upload/20170803/2293694028481536.jpg",
			"relationshipProve": "/upload/20170803/2293694164452352.jpg",
			"companyId": "2292494350468096",
			"companyName": "江苏沃鑫船务有限公司",
			"authority": "b0,b10,b11,3,4,9,",
			"duty": "船务部",
			"sex": "男",
			"openid": "oxwWywUGueWYfoshjesJUh3dhDDA",
			"nationality": null,
			"serviceCode": null,
			"status": 0,
			"reply": null,
			"portId": "1835151452341248",
			"applyTime": "2017-08-02 20:15:10",
			"birthday": "1984-11-07",
			"startTime": null,
			"endTime": null,
			"auditPhotos": null,
			"portAuth": null,
			"remindTag": false
		},
		{
			"id": "2293199420605440",
			"partyId": "22793850154854499736",
			"name": "邹付国",
			"identityCard": "321281198707084377",
			"phone": "13851658160",
			"city": null,
			"cityType": null,
			"remarkMatter": "外轮代理",
			"frontCard": "/upload/20170821/2318941073736704.jpg",
			"behindCard": "/upload/20170821/2318941221946368.jpg",
			"handCard": "/upload/20170821/2318941378855936.jpg",
			"relationshipProve": "/upload/20170821/2318941579445248.jpg,/upload/20170821/2318941587293184.jpg,/upload/20170821/2318941595239424.jpg,/upload/20170821/2318941601350656.jpg",
			"companyId": "_NULL",
			"companyName": "南京航姆船舶代理有限公司",
			"authority": "b0,b8,1,2,3,4,9,",
			"duty": "外勤",
			"sex": "男",
			"openid": "oxwWywaV8FTpYiC28UCIXexpGQ8k",
			"nationality": null,
			"serviceCode": null,
			"status": '',
			"reply": null,
			"portId": "1835151452341248",
			"applyTime": "2017-08-03 08:18:46",
			"birthday": "1987-07-08",
			"startTime": null,
			"endTime": null,
			"auditPhotos": null,
			"portAuth": null,
			"remindTag": false
		}],
        dialogFormVisible: false,
		form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		formLabelWidth: '120px',
		queryFormInfo:{
			status:"",
			company:"",
			portId:"",
		},
		allPageData:{
			total:'20'
		},
		companyList:[{
		"id": "2095489893303296",
		"companyName": "张家港保税区瑞创国际物流有限公司",
		"businessNo": "91320592MA1ND4B017",
		"taxNo": "91320592MA1ND4B017",
		"legalPerson": "张洁",
		"categoryName": "外轮代理公司",
		"threeCertificate": "/upload/20170316/2095482756137984.jpg",
		"businessLicense": null,
		"hygieneCertificate": null,
		"personnelList": "/upload/20170316/2095488685261824.jpg",
		"remark": null,
		"status": 1,
		"serviceCode": "徐振扬",
		"relationshipCertificate": "/upload/20170316/2095488422609920.jpg",
		"dockCertificate": null,
		"maritimeCertificate": null,
		"commodityCertificate": null,
		"shipCertificate": "/upload/20170316/2095483563295744.jpg",
		"openid": "oxwWywecIOezaD3i4fTi0i-yUAlU",
		"reply": "通过",
		"portId": "1835153608475648",
		"applyTime": "2017-03-16 16:18:14"
	},
	{
		"id": "2163441998676992",
		"companyName": "南通明洋船务代理有限公司",
		"businessNo": "91320602755877935P",
		"taxNo": "91320602755877935P",
		"legalPerson": "王湧泉",
		"categoryName": "外轮代理公司",
		"threeCertificate": "/upload/20170503/2163438773371904.jpg",
		"businessLicense": null,
		"hygieneCertificate": null,
		"personnelList": "/upload/20170503/2163439510651904.jpg",
		"remark": null,
		"status": 1,
		"serviceCode": "庞嘉华",
		"relationshipCertificate": "/upload/20170503/2163439685239808.jpg,/upload/20170503/2163439687287808.jpg",
		"dockCertificate": null,
		"maritimeCertificate": null,
		"commodityCertificate": null,
		"shipCertificate": "/upload/20170503/2163438926971904.jpg",
		"openid": "oxwWywQXzFeLGapRULjEirCelg-Q",
		"reply": "通过",
		"portId": "1835152074638336",
		"applyTime": "2017-05-03 16:22:42"
	},
	{
		"id": "2163454741185536",
		"companyName": "常熟外轮代理有限公司",
		"businessNo": "91320581251451404N",
		"taxNo": "91320581251451404N",
		"legalPerson": "邹土兴",
		"categoryName": "外轮代理公司",
		"threeCertificate": "/upload/20170503/2163439562097664.jpg",
		"businessLicense": null,
		"hygieneCertificate": null,
		"personnelList": "/upload/20170503/2163446551331840.jpg",
		"remark": null,
		"status": 1,
		"serviceCode": "张文祥",
		"relationshipCertificate": "/upload/20170503/2163454696375296.jpg",
		"dockCertificate": null,
		"maritimeCertificate": null,
		"commodityCertificate": null,
		"shipCertificate": "/upload/20170503/2163440694117376.jpg",
		"openid": "oxwWywbxfWp44cKtvTyNcdFtPIxU",
		"reply": "通过",
		"portId": "1835153734452224",
		"applyTime": "2017-05-03 16:35:40"
	}],
		portList:[{
		"id": "1835150862795776",
		"portCode": "P0008",
		"portName": "连云港出入境边防检查站",
		"portType": null,
		"status": 0,
		"remark": "连云港边检站",
		"phone": "0518-82310663",
		"lon": "119.354985",
		"lat": "34.724527"
	},
	{
		"id": "1835151111291904",
		"portCode": "P0014",
		"portName": "盐城出入境边防检查站",
		"portType": null,
		"status": 0,
		"remark": "盐城边检站",
		"phone": "0515-83287110",
		"lon": "119.071264",
		"lat": "32.198525"
	},
	{
		"id": "1835151452341248",
		"portCode": "P0001",
		"portName": "南京港出入境边防检查站",
		"portType": null,
		"status": 0,
		"remark": "南京港边检站",
		"phone": "暂无",
		"lon": "118.736115",
		"lat": "32.094828"
	}],

		    }
			
		},
		mounted:function(){
			let $this = this;
			let pageObj = {
				page: 1, //当前页
				rows: 10, //每页条数
				sort: "", //排序字段
				order: "" //排序顺序
			};
			/*getCompanys(function(resp){
				debugger;
				$this.companyList = resp.returnValue;
			})
			getPorts(function(resp){
				debugger;
				$this.portList = resp.returnValue;
			})
			*/
			/*getUsersForPage(pageObj,{status: 0, portId: ""},function(resp){
				debugger;
				if(resp.returnValue && resp.returnValue.total > 0){
					$this.tableData = resp.returnValue.rows;

				}

			})*/
		},
		methods:{
			dblClick:function(currentData){
				debugger;
				console.log(currentData);
			},
			onSubmit:function(){

			},
			selectCurrentPage:function(currentPageNum){
				debugger;
				console.log(pageInfo);
			}
		}
	}
</script>
<style>
</style>
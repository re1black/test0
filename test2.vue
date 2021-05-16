<template>
  <div>
    <div>
      <div
        style="
          background-color: rgb(85, 85, 85);
          width: 100%;
          text-align: center;
        "
      >
        <span style="color: white">新增题目</span>
      </div>
      <div style="width: 1000px; margin: 0 auto">
        <Form
          ref="formDynamic"
          :model="formDynamic"
          :label-width="160"
          :rules="ruleValidate"
          label-position="left"
          style="width: 800px"
        >
          <FormItem label="请选择题目类型" prop="title">
            <Select
              @on-change="restart"
              v-model="formDynamic.title"
              placeholder="Select your title"
            >
              <Option value="select">选择题</Option>
              <Option value="judge">判断题</Option>
              <Option value="multiple">多选题</Option>
            </Select>
          </FormItem>
          <!-- 单选题 -->
          <div
            v-if="formDynamic.title == 'select' || formDynamic.title == 'judge'"
          >
            <FormItem label="请输入选项" prop="">
              <Row style="visibility: hidden">space</Row>
              <Row
                style="margin-bottom: 20px"
                v-for="(item, index) in index"
                :key="index"
              >
                <Col span="4">{{
                  "答案 " + String.fromCodePoint(65 + index)
                }}</Col>
                <Col span="12">
                  <Input
                    type="textarea"
                    v-model="formDynamic.values[index - 1]"
                    placeholder="Enter something..."
                    autosize
                  ></Input>
                </Col>
                <Col v-if="index != 0" span="3" offset="1">
                  <Button @click="handleRemove(index)">Delete</Button>
                </Col>
                <Col v-if="index == 0" span="2" offset="1">
                  <Button
                    @click="handleAdd"
                    icon="md-add"
                    :disabled="isdisabledFn"
                    shape="circle"
                  ></Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="请选择正确答案" prop="answer">
              <Row style="visibility: hidden">space</Row>
              <RadioGroup v-model="formDynamic.answer">
                <Row
                  ><Radio
                    v-for="(item, index) in index"
                    :key="index"
                    :label="String.fromCodePoint(65 + index)"
                    >{{ "答案 " + String.fromCodePoint(65 + index) }}</Radio
                  ></Row
                >
              </RadioGroup>
            </FormItem>
          </div>
          <!-- 判断题 -->

          <!-- 多选题 -->
          <div v-if="formDynamic.title == 'multiple'">
            <FormItem label="请输入选项" prop="isEmpty">
              <Row style="visibility: hidden">space</Row>
              <Row
                style="margin-bottom: 20px"
                v-for="(item, index) in index"
                :key="index"
              >
                <Col span="4">{{
                  "答案 " + String.fromCodePoint(65 + index)
                }}</Col>
                <Col span="12">
                  <Input
                    type="textarea"
                    v-model="formDynamic.values[index - 1]"
                    placeholder="Enter something..."
                    autosize
                  ></Input>
                </Col>
                <Col v-if="index != 0" span="3" offset="1">
                  <Button @click="handleRemove(index)">Delete</Button>
                </Col>
                <Col v-if="index == 0" span="2" offset="1">
                  <Button
                    @click="handleAdd"
                    icon="md-add"
                    :disabled="isdisabledFn"
                    shape="circle"
                  ></Button>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="请选择正确答案" prop="interest">
              <Row style="visibility: hidden">space</Row>

              <CheckboxGroup v-model="formDynamic.interest">
                <Row
                  ><Checkbox
                    v-for="(item, index) in index"
                    :key="index"
                    :label="String.fromCodePoint(65 + index)"
                  ></Checkbox
                ></Row>
              </CheckboxGroup>
            </FormItem>
          </div>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')"
              >Submit</Button
            >
            <Button @click="handleReset('formDynamic')" style="margin-left: 8px"
              >Reset</Button
            >
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isdisabledFn: false,
      index: 1,
      formDynamic: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: '',
        title: '',
        answer: '',
        values: [],
        isEmpty: "",
        items: [
          {

            value: '',
            index: 0,
            status: 1
          }
        ],
      },
      ruleValidate: {
        title: [
          { required: true, message: '题目 cannot be empty', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        answer: [
          { required: true, message: 'Please select the answer', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 2, message: 'Choose at least two hobby', trigger: 'change' },
          // { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        values: [
          { required: true, type: 'array', min: 2, message: 'test', trigger: 'change' },
          // { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        isEmpty: [
          { required: true, message: 'Please select the answer', trigger: 'change' }
        ],

      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    handleAdd () {
      this.index++;

      this.formDynamic.items.push({

        value: '',
        index: this.index,
        status: 1
      });
      if (this.index >= 1 && this.formDynamic.title == 'judge') {
        this.isdisabledFn = true;
      }

    },
    handleRemove (index) {
      this.index--;
      if (this.isdisabledFn) {
        this.isdisabledFn = false;
      }
      // this.formDynamic.items[index].status = 0;
    },
    restart () {
      this.index = 1;
      this.isdisabledFn = false;
    }
  }
}
</script>

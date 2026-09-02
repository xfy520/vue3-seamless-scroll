<template>
  <el-radio-group v-model="radio" @change="change">
    <el-radio :value="1" size="large" border>默认配置</el-radio>
    <el-radio :value="2" size="large" border>鼠标悬停</el-radio>
    <el-radio :value="3" size="large" border>鼠标悬停鼠标滚动</el-radio>
    <el-radio :value="4" size="large" border>默认单步一秒</el-radio>
    <el-radio :value="5" size="large" border>自定义单步停顿时间</el-radio>
    <el-radio :value="6" size="large" border>自定义速度</el-radio>
    <el-radio :value="7" size="large" border>增加元素</el-radio>
    <el-radio :value="8" size="large" border>删除元素</el-radio>
    <el-radio :value="9" size="large" border>更新元素</el-radio>
    <el-radio :value="10" size="large" border>盒子大小变化</el-radio>
    <el-radio :value="11" size="large" border>无限数据</el-radio>
    <el-radio :value="12" size="large" border>表格滚动</el-radio>
  </el-radio-group>
  <div v-if="radio === 1">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" direction="down">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" direction="down">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="left" style="display: flex;">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="right" style="display: flex;">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 2">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" hover>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" direction="down" hover>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" hover>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" hover>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" hover>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" direction="down" hover>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="left" style="display: flex;" hover>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="right" style="display: flex;" hover>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 3">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" hover wheel>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" direction="down" hover wheel>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" hover wheel>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" hover wheel>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" hover wheel>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" direction="down" hover wheel>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="left" style="display: flex;" hover wheel>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="right" style="display: flex;" hover wheel>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 4">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" singleLine>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" direction="down" singleLine>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" singleLine>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" singleLine>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" singleLine>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" direction="down" singleLine>
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="left" style="display: flex;" singleLine>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="right" style="display: flex;" singleLine>
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 5">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上单步停顿2秒" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" singleLine :singleWaitTime="2000">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下单步停顿3秒" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" direction="down" singleLine :singleWaitTime="3000">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左单步停顿3秒">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" singleLine :singleWaitTime="3000">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右单步停顿5秒">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" singleLine :singleWaitTime="5000">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上单步停顿3秒" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" singleLine :singleWaitTime="3000">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下单步停顿5秒" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" direction="down" singleLine :singleWaitTime="5000">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左单步停顿3秒" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="left" style="display: flex;" singleLine
              :singleWaitTime="3000">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右单步停顿2秒" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="right" style="display: flex;" singleLine
              :singleWaitTime="2000">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 6">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" :step="0.5">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list" direction="down" :step="0.3">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" :step="0.6">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list" style="display: flex;" :step="0.8">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" :step="1">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list" direction="down" :step="2">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="left" style="display: flex;" :step="1.5">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list" direction="right" style="display: flex;" :step="0.5">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 7">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" :ref="el => addRefs[0] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" direction="down" :ref="el => addRefs[1] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => addRefs[2] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => addRefs[3] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" :ref="el => addRefs[4] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" direction="down" :ref="el => addRefs[5] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="left" style="display: flex;" :ref="el => addRefs[6] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="right" style="display: flex;" :ref="el => addRefs[7] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 8">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" :ref="el => delRefs[0] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" direction="down" :ref="el => delRefs[1] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => delRefs[2] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => delRefs[3] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" :ref="el => delRefs[4] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" direction="down" :ref="el => delRefs[5] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="left" style="display: flex;" :ref="el => delRefs[6] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="right" style="display: flex;" :ref="el => delRefs[7] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 9">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" :ref="el => editRefs[0] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" direction="down" :ref="el => editRefs[1] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => editRefs[2] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => editRefs[3] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" :ref="el => editRefs[4] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" direction="down" :ref="el => editRefs[5] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="left" style="display: flex;" :ref="el => editRefs[6] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="right" style="display: flex;" :ref="el => editRefs[7] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 10">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" :ref="el => editSizeRefs[0] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list1" direction="down" :ref="el => editSizeRefs[1] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => editSizeRefs[2] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list1" style="display: flex;" :ref="el => editSizeRefs[3] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" :ref="el => editSizeRefs[4] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list1" direction="down" :ref="el => editSizeRefs[5] = el">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <template v-if="data.id % 2 === 0">
                    <div>{{ data.name }}</div>
                  </template>
                  <template v-else>
                    <div>{{ data.name }}</div>
                    <div>{{ data.name }}</div>
                  </template>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="left" style="display: flex;"
              :ref="el => editSizeRefs[6] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list1" direction="right" style="display: flex;"
              :ref="el => editSizeRefs[7] = el">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 11">
    <div style="margin-top: 30px;">
      <h2>单组件使用</h2>
    </div>
    <el-row justify="space-evenly" style="margin-top: 30px;">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list2" :step="2" :ref="el => loopDataRefs[0] = el"
              @offset="(bufferSize, targetList) => offset(0, bufferSize, targetList)">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <div>{{ data.name }}</div>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <VerticalScroll :list="list2" direction="down" :ref="el => loopDataRefs[1] = el"
              @offset="(bufferSize, targetList) => offset(1, bufferSize, targetList)">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <div>{{ data.name }}</div>
                </span>
              </template>
            </VerticalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list2" style="display: flex;" :ref="el => loopDataRefs[2] = el"
              @offset="(bufferSize, targetList) => offset(2, bufferSize, targetList)">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右">
          <div class="horizonta-scoll">
            <HorizontalScroll :list="list2" style="display: flex;" :ref="el => loopDataRefs[3] = el"
              @offset="(bufferSize, targetList) => offset(3, bufferSize, targetList)">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </HorizontalScroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px;">
      <h2>一个组件使用</h2>
    </div>
    <el-row justify="space-evenly">
      <el-col :span="6">
        <el-card header="向上" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list2" :ref="el => loopDataRefs[4] = el"
              @offset="(bufferSize, targetList) => offset(4, bufferSize, targetList)">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <div>{{ data.name }}</div>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向下" style="text-align: center;">
          <div class="vertical-scoll">
            <vue3-seamless-scroll :list="list2" direction="down" :ref="el => loopDataRefs[5] = el"
              @offset="(bufferSize, targetList) => offset(5, bufferSize, targetList)">
              <template v-slot="{ data }">
                <span style="width: 100%; display: block; line-height: 30px;">
                  <div>{{ data.name }}</div>
                </span>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向左" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list2" direction="left" style="display: flex;"
              :ref="el => loopDataRefs[6] = el" @offset="(bufferSize, targetList) => offset(6, bufferSize, targetList)">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="向右" style="text-align: center;">
          <div class="horizonta-scoll">
            <vue3-seamless-scroll :list="list2" direction="right" style="display: flex;"
              :ref="el => loopDataRefs[7] = el" @offset="(bufferSize, targetList) => offset(7, bufferSize, targetList)">
              <template v-slot="{ data }">
                <div class="vertical-text">
                  {{ data.name }}
                </div>
              </template>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div v-if="radio === 12">
    <div style="margin-top: 30px; display: flex; align-items: center; gap: 12px;">
      <h2>表格滚动（表头固定 + 表体无缝滚动）</h2>
      <el-switch v-model="tableSingleLine" active-text="单步滚动（滚一条停一停）" />
      <el-button size="small" @click="refreshTableList">模拟数据整体刷新</el-button>
    </div>
    <div class="board-table-wrap">
      <table class="board-table">
        <colgroup>
          <col style="width: 30%">
          <col style="width: 14%">
          <col style="width: 14%">
          <col style="width: 14%">
          <col style="width: 14%">
          <col style="width: 14%">
        </colgroup>
        <thead>
          <tr>
            <th>任务名称</th>
            <th>任务数</th>
            <th>计划数</th>
            <th>已完成</th>
            <th>未完成</th>
            <th>延期数</th>
          </tr>
        </thead>
      </table>
      <div class="table-scroll-box">
        <vue3-seamless-scroll :key="tableScrollKey" :list="tableList" direction="up" :step="1" hover
          :single-line="tableSingleLine" :single-wait-time="1000">
          <template v-slot="{ data, index }">
            <table class="board-table">
              <colgroup>
                <col style="width: 30%">
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 14%">
                <col style="width: 14%">
              </colgroup>
              <tr :class="tableRowClassName({ rowIndex: index + 1 })">
                <td>{{ data.taskName }}</td>
                <td>{{ data.taskNum }}</td>
                <td>{{ data.taskPlanNum }}</td>
                <td>{{ data.finished }}</td>
                <td>{{ data.unfinished }}</td>
                <td>{{ data.delayNum }}</td>
              </tr>
            </table>
          </template>
        </vue3-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
const listData = Array.from({ length: 10000 }, (_, i) => ({
  id: Date.now() + i + 1,
  name: `Vue3.0无缝滚动展示数据第${i + 1}条`,
}));

import { defineComponent, nextTick, ref } from 'vue';
import { VerticalScroll, HorizontalScroll } from '../packages/index';

export default defineComponent({
  name: "App",
  components: {
    VerticalScroll,
    HorizontalScroll,
  },
  setup() {
    const list = ref(listData);
    const list1 = ref(listData);
    const addRefs = ref([null, null, null, null, null, null, null, null]);
    const delRefs = ref([null, null, null, null, null, null, null, null]);
    const editRefs = ref([null, null, null, null, null, null, null, null]);
    const editSizeRefs = ref([null, null, null, null, null, null, null, null]);
    const loopDataRefs = ref([null, null, null, null, null, null, null, null]);

    const list2 = ref(Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i + 1,
      name: `Vue3.0无缝滚动展示数据第${i + 1}条`,
    })));

    const taskNames = ['数据接入', '报表生成', '质量校验', '告警巡检', '日志归档', '资源调度', '版本发布', '模型训练'];
    const genTableList = () => Array.from({ length: 10 }, (_, i) => ({
      taskName: `${taskNames[i % taskNames.length]}-${i + 1}`,
      taskNum: Math.floor(Math.random() * 40) + 10,
      taskPlanNum: Math.floor(Math.random() * 30) + 5,
      finished: Math.floor(Math.random() * 20),
      unfinished: Math.floor(Math.random() * 10),
      delayNum: Math.floor(Math.random() * 5),
    }));
    const tableList = ref(genTableList());
    const tableScrollKey = ref(0);
    // singleWaitTime 需搭配 singleLine 才生效：开启后每滚动一条数据停顿 singleWaitTime 毫秒
    const tableSingleLine = ref(false);
    // v5 的 list 是一次性快照：整体刷新数据后需通过 :key 重建组件重新读取
    const refreshTableList = () => {
      tableList.value = genTableList();
      tableScrollKey.value += 1;
    };
    // 插槽的 index 是数据在原始列表中的位置，滚动过程中保持稳定
    const tableRowClassName = ({ rowIndex }) => (rowIndex % 2 === 0 ? 'board-row-striped' : '');

    let t1 = null;
    let t2 = null;
    let t3 = null;
    let t4 = null;
    let t5 = null;

    const change = (val) => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      if (val !== 10) {
        Array.from(document.querySelectorAll('.vertical-scoll'))
          .forEach((d) => {
            d.style.height = `300px`;
          })
        Array.from(document.querySelectorAll('.horizonta-scoll'))
          .forEach((d) => {
            d.style.height = `300px`;
          })
      }
      if (val === 7) {
        nextTick(() => {
          t1 = setTimeout(() => {
            const data = {
              id: Date.now(),
              name: `Vue3.0无缝滚动展示新增数据`,
            };
            addRefs.value[0].add(5, [data]);
            addRefs.value[1].add(2, [data]);
            addRefs.value[2].add(7, [data]);
            addRefs.value[3].add(9, [data]);
            addRefs.value[4].add(11, [data]);
            addRefs.value[5].add(15, [data]);
            addRefs.value[6].add(19, [data]);
            addRefs.value[7].add(20, [data]);
          }, 2000);
          t2 = setTimeout(() => {
            const data = {
              id: Date.now(),
              name: `Vue3.0无缝滚动展示新增多条数据`,
            };
            addRefs.value[0].add(1, [data, data, data]);
            addRefs.value[1].add(3, [data, data, data]);
            addRefs.value[2].add(5, [data, data, data]);
            addRefs.value[3].add(8, [data, data, data]);
            addRefs.value[4].add(6, [data, data, data]);
            addRefs.value[5].add(12, [data, data, data]);
            addRefs.value[6].add(18, [data, data, data]);
            addRefs.value[7].add(20, [data, data, data]);
          }, 5000);
        })
      }
      if (val === 8) {
        t3 = setTimeout(() => {
          delRefs.value[0].remove(3, 2);
          delRefs.value[1].remove(2, 3);
          delRefs.value[2].remove(1, 1);
          delRefs.value[3].remove(5);
          delRefs.value[4].remove(3);
          delRefs.value[5].remove(10, 5);
          delRefs.value[6].remove(11, 2);
          delRefs.value[7].remove(6, 6);
        }, 2000);
      }
      if (val === 9) {
        const data = {
          id: Date.now(),
          name: `Vue3.0无缝滚动展示更新数据`,
        };
        t4 = setTimeout(() => {
          editRefs.value[0].update(3, data);
          editRefs.value[1].update(2, data);
          editRefs.value[2].update(1, data);
          editRefs.value[3].update(5, data);
          editRefs.value[4].update(10, data);
          editRefs.value[5].update(6, data);
          editRefs.value[6].update(11, data);
          editRefs.value[7].update(8, data);
        }, 3000);
      }
      if (val === 10) {
        t5 = setTimeout(() => {
          const random = Math.floor(Math.random() * (500 - 300 + 1)) + 300;
          Array.from(document.querySelectorAll('.vertical-scoll'))
            .forEach((d) => {
              d.style.height = `${random}px`;
            })
          Array.from(document.querySelectorAll('.horizonta-scoll'))
            .forEach((d) => {
              d.style.height = `${random}px`;
            })
          editSizeRefs.value[0].reset();
          editSizeRefs.value[1].reset();
          editSizeRefs.value[2].reset();
          editSizeRefs.value[3].reset();
          editSizeRefs.value[4].reset();
          editSizeRefs.value[5].reset();
          editSizeRefs.value[6].reset();
          editSizeRefs.value[7].reset();
        }, 3000);
      }
    }

    const offset = (index, bufferSize, targetList) => {
      const date = Date.now();
      loopDataRefs.value[index].add(targetList.length, Array.from({ length: bufferSize }, (_, i) => ({
        id: date + i + 1,
        name: `无缝滚动模拟分页请求数据 ${date + i}`,
      })));
      if (targetList.length >= 100) {
        loopDataRefs.value[index].remove(0, 50);
      }
    }
    const radio = ref(1);
    return {
      list,
      list1,
      list2,
      radio,
      addRefs,
      delRefs,
      editRefs,
      editSizeRefs,
      loopDataRefs,
      tableList,
      tableScrollKey,
      tableSingleLine,
      refreshTableList,
      tableRowClassName,
      offset,
      change
    };
  },
});
</script>
<style>
.vertical-scoll {
  overflow: hidden;
  height: 300px;
}

.horizonta-scoll {
  overflow: hidden;
  height: 300px;
}


.vertical-text {
  height: 300px;
  writing-mode: vertical-lr;
  text-orientation: upright;
  line-height: 30px;
  display: inline-block;
}

.board-table-wrap {
  margin: 30px auto 0;
  width: 70%;
}

.board-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 14px;
}

.board-table th,
.board-table td {
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-bottom: 1px solid #ebeef5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.board-table th {
  background: #f5f7fa;
  color: #606266;
  font-weight: 600;
}

.board-row-striped td {
  background: #fafafa;
}

.table-scroll-box {
  height: 150px;
  overflow: hidden;
}
</style>

"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[251],{90670:(e,t,n)=>{n.d(t,{YE:()=>$,bf:()=>v,yr:()=>l});var r=n(51520),i=n(67108),o=n(82859);let{getBroadcastDims:a}=r.backend_util;function l(e,t,n){var l,C,T,m;let R,g,w=[];if(e.forEach(e=>{let t=r.util.sizeFromShape(e.shapeInfo.logicalShape);if(e.shapeInfo.isUniform?w.push(`uniform float ${e.name}${t>1?`[${t}]`:""};`):(w.push(`uniform sampler2D ${e.name};`),w.push(`uniform int offset${e.name};`)),n.enableShapeUniforms){let{uniformShape:t}=$(n.packedInputs,e.shapeInfo.logicalShape,e.shapeInfo.texShape);switch(t.length){case 1:w.push(`uniform int ${e.name}Shape;`);break;case 2:w.push(`uniform ivec2 ${e.name}Shape;`);break;case 3:w.push(`uniform ivec3 ${e.name}Shape;`);break;case 4:w.push(`uniform ivec4 ${e.name}Shape;`)}w.push(`uniform ivec2 ${e.name}TexShape;`)}}),n.enableShapeUniforms){switch(t.logicalShape.length){case 1:w.push("uniform int outShape;");break;case 2:w.push("uniform ivec2 outShape;"),w.push("uniform int outShapeStrides;");break;case 3:w.push("uniform ivec3 outShape;"),w.push("uniform ivec2 outShapeStrides;");break;case 4:w.push("uniform ivec4 outShape;"),w.push("uniform ivec3 outShapeStrides;")}w.push("uniform ivec2 outTexShape;")}n.customUniforms&&n.customUniforms.forEach(e=>{w.push(`uniform ${e.type} ${e.name}${e.arrayIndex?`[${e.arrayIndex}]`:""};`)});let y=w.join("\n"),I=e.map(e=>(function(e,t,n=!1,o){let l="";n?l+=function e(t,n){switch(t.shapeInfo.logicalShape.length){case 0:var o=t;let a=o.name,l="get"+a.charAt(0).toUpperCase()+a.slice(1),c=(0,i.B)();return`
    vec4 ${l}() {
      return ${c.texture2D}(${a}, halfCR);
    }
  `;case 1:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=e.shapeInfo.texShape,a=(0,i.B)();if(t)return`
    vec4 ${r}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${a.texture2D}(${n}, uv);
    }
  `;let l=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];return`
    vec4 ${r}(int index) {
      vec2 uv = packedUVfrom1D(
        ${l[0]}, ${l[1]}, index);
      return ${a.texture2D}(${n}, uv);
    }
  `}(t,n);case 2:return function(e,t){let n=e.shapeInfo.logicalShape,o=e.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),l=e.shapeInfo.texShape,c=l[0],u=l[1],p=(0,i.B)();if(null!=l&&r.util.arraysEqual(n,l))return t?`
      vec4 ${a}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);

        return ${p.texture2D}(${o}, uv);
      }
    `:`
      vec4 ${a}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${u}.0, ${c}.0);

        return ${p.texture2D}(${o}, uv);
      }
    `;if(t)return`
    vec4 ${a}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${p.texture2D}(${o}, uv);
    }
  `;let x=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)],h=Math.ceil(n[1]/2);return`
    vec4 ${a}(int row, int col) {
      vec2 uv = packedUVfrom2D(${h}, ${x[0]}, ${x[1]}, row, col);
      return ${p.texture2D}(${o}, uv);
    }
  `}(t,n);case 3:return function(t,n){let r=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),l=t.shapeInfo.texShape,c=[Math.ceil(l[0]/2),Math.ceil(l[1]/2)];if(1===r[0]){let i=f(t,r.slice(1));return`
        ${e(i,n)}
        vec4 ${a}(int b, int row, int col) {
          return ${a}(${S(["b","row","col"],[1,2])});
        }
      `}let u=(0,i.B)();if(n)return`
    vec4 ${a}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${u.texture2D}(${o}, uv);
    }
  `;let p=c[0],x=c[1],h=Math.ceil(r[2]/2),s=h*Math.ceil(r[1]/2);return`
    vec4 ${a}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${p}, ${x}, ${s}, ${h}, b, row, col);
      return ${u.texture2D}(${o}, uv);
    }
  `}(t,n);default:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1),o=(0,i.B)();if(t)return`
    vec4 ${r}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${n}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${n}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${n}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${n}TexShape[0]) / 2.0), ceil(float(${n}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${o.texture2D}(${n}, uv);
    }
  `;let a=e.shapeInfo.logicalShape,l=a.length,c=e.shapeInfo.texShape,u=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)],p=u[0],x=u[1],h=Math.ceil(a[l-1]/2),s=h*Math.ceil(a[l-2]/2),d="int b, int row, int col",v=`b * ${s} + (row / 2) * ${h} + (col / 2)`;for(let e=2;e<l-1;e++)d=`int b${e}, `+d,s*=a[l-e-1],v=`b${e} * ${s} + `+v;return`
    vec4 ${r}(${d}) {
      int index = ${v};
      int texR = index / ${x};
      int texC = index - texR * ${x};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${x}, ${p});
      return ${o.texture2D}(${n}, uv);
    }
  `}(t,n)}}(e,o):l+=function e(t,n=!1){let i=t.shapeInfo.logicalShape;switch(i.length){case 0:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`float ${r}() {return ${n};}`;let[i,o]=e.shapeInfo.texShape;if(1===i&&1===o)return`
      float ${r}() {
        return sampleTexture(${n}, halfCR);
      }
    `;let a=s(n);if(t)return`
    float ${r}() {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], ${a});
      return sampleTexture(${n}, uv);
    }
  `;let[l,c]=e.shapeInfo.texShape;return`
    float ${r}() {
      vec2 uv = uvFromFlat(${l}, ${c}, ${a});
      return sampleTexture(${n}, uv);
    }
  `}(t,n);case 1:return function(e,t){let n=e.name,r="get"+n.charAt(0).toUpperCase()+n.slice(1);if(e.shapeInfo.isUniform)return`
      float ${r}(int index) {
        ${d(e)}
      }
    `;let i=e.shapeInfo.texShape,o=i[0],a=i[1];if(1===a&&1===o)return`
      float ${r}(int index) {
        return sampleTexture(${n}, halfCR);
      }
    `;let l=s(n);return 1===a?t?`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${l}) + 0.5) / float(${n}TexShape[0]));
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${l}) + 0.5) / ${o}.0);
        return sampleTexture(${n}, uv);
      }
    `:1===o?t?`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${l}) + 0.5) / float(${n}TexShape[1]), 0.5);
        return sampleTexture(${n}, uv);
      }
    `:`
      float ${r}(int index) {
        vec2 uv = vec2((float(index + ${l}) + 0.5) / ${a}.0, 0.5);
        return sampleTexture(${n}, uv);
      }
    `:t?`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${n}TexShape[0], ${n}TexShape[1], index + ${l});
      return sampleTexture(${n}, uv);
    }
  `:`
    float ${r}(int index) {
      vec2 uv = uvFromFlat(${o}, ${a}, index + ${l});
      return sampleTexture(${n}, uv);
    }
  `}(t,n);case 2:return function(t,n){let i=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),l=t.shapeInfo.texShape;if(null!=l&&r.util.arraysEqual(i,l)){if(n)return`
      float ${a}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `;let e=l[0],t=l[1];return`
    float ${a}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${t}.0, ${e}.0);
      return sampleTexture(${o}, uv);
    }
  `}let{newShape:c,keptDims:u}=r.util.squeezeShape(i);if(c.length<i.length){let r=f(t,c);return`
      ${e(r,n)}
      float ${a}(int row, int col) {
        return ${a}(${S(["row","col"],u)});
      }
    `}if(t.shapeInfo.isUniform)return`
      float ${a}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${i[1]}, 1)));
        ${d(t)}
      }
    `;let p=l[0],x=l[1],h=s(o);return 1===x?n?`
      float ${a}(int row, int col) {
        float index = dot(vec3(row, col, ${h}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${o}TexShape[0]));
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${a}(int row, int col) {
      float index = dot(vec3(row, col, ${h}), vec3(${i[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${p}.0);
      return sampleTexture(${o}, uv);
    }
  `:1===p?n?`
      float ${a}(int row, int col) {
        float index = dot(vec3(row, col, ${h}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${o}TexShape[1]), 0.5);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${a}(int row, int col) {
      float index = dot(vec3(row, col, ${h}), vec3(${i[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${x}.0, 0.5);
      return sampleTexture(${o}, uv);
    }
  `:n?`
      float ${a}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${o}Shape[1] + col + ${h};
        vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
        return sampleTexture(${o}, uv);
      }
    `:`
  float ${a}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${i[1]} + col + ${h};
    vec2 uv = uvFromFlat(${p}, ${x}, index);
    return sampleTexture(${o}, uv);
  }
`}(t,n);case 3:return function(t,n){let i=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),l=i[1]*i[2],c=i[2],{newShape:u,keptDims:p}=r.util.squeezeShape(i);if(u.length<i.length){let r=f(t,u);return`
        ${e(r,n)}
        float ${a}(int row, int col, int depth) {
          return ${a}(${S(["row","col","depth"],p)});
        }
      `}if(t.shapeInfo.isUniform)return`
      float ${a}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${l}, ${c}, 1)));
        ${d(t)}
      }
    `;let x=t.shapeInfo.texShape,h=x[0],v=x[1],$=t.shapeInfo.flatOffset;if(v===l&&null==$)return n?`
      float ${a}(int row, int col, int depth) {
        int stride1 = ${o}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
        float ${a}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${c}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${v}.0, ${h}.0);
          return sampleTexture(${o}, uv);
        }
      `;if(v===c&&null==$)return n?`
      float ${a}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${o}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${a}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${i[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${v}.0, ${h}.0);
      return sampleTexture(${o}, uv);
    }
  `;let C=s(o);return n?`
    float ${a}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${o}Shape[1] * ${o}Shape[2];
      int stride1 = ${o}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${C};
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
      return sampleTexture(${o}, uv);
    }
    `:`
      float ${a}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${l} + col * ${c} + depth + ${C};
        vec2 uv = uvFromFlat(${h}, ${v}, index);
        return sampleTexture(${o}, uv);
      }
  `}(t,n);case 4:return function(t,n){let i=t.shapeInfo.logicalShape,o=t.name,a="get"+o.charAt(0).toUpperCase()+o.slice(1),l=i[3],c=i[2]*l,u=i[1]*c,{newShape:p,keptDims:x}=r.util.squeezeShape(i);if(p.length<i.length){let r=f(t,p);return`
      ${e(r,n)}
      float ${a}(int row, int col, int depth, int depth2) {
        return ${a}(${S(["row","col","depth","depth2"],x)});
      }
    `}if(t.shapeInfo.isUniform)return`
      float ${a}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${u}, ${c}, ${l}, 1)));
        ${d(t)}
      }
    `;let h=t.shapeInfo.flatOffset,v=t.shapeInfo.texShape,$=v[0],C=v[1],T=`int stride2 = ${o}Shape[3];`,m=`int stride1 = ${o}Shape[2] * stride2;`,R=`int stride0 = ${o}Shape[1] * stride1;`;if(C===u&&null==h)return n?`
      float ${a}(int row, int col, int depth, int depth2) {
        ${T}
        ${m}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${a}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${c}, ${l}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${C}.0, ${$}.0);
        return sampleTexture(${o}, uv);
      }
    `;if(C===l&&null==h)return n?`
      float ${a}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${o}Shape[1] * ${o}Shape[2], ${o}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${a}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${i[1]*i[2]}, ${i[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${C}.0, ${$}.0);
        return sampleTexture(${o}, uv);
      }
    `;let g=s(o);return n?`
    float ${a}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${T}
      ${m}
      ${R}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index + ${g});
      return sampleTexture(${o}, uv);
    }
  `:`
    float ${a}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${c} +
          depth * ${l} + depth2;
      vec2 uv = uvFromFlat(${$}, ${C}, index + ${g});
      return sampleTexture(${o}, uv);
    }
  `}(t,n);case 5:return function(t){let n=t.shapeInfo.logicalShape,i=t.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),a=n[4],l=n[3]*a,c=n[2]*l,u=n[1]*c,{newShape:p,keptDims:x}=r.util.squeezeShape(n);if(p.length<n.length){let n=f(t,p);return`
      ${e(n)}
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        return ${o}(${S(["row","col","depth","depth2","depth3"],x)});
      }
    `}if(t.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${u}, ${c}, ${l}, ${a})) +
          depth3;
        ${d(t)}
      }
    `;let h=t.shapeInfo.flatOffset,v=t.shapeInfo.texShape,$=v[0],C=v[1];if(C===u&&null==h)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${c}, ${l}, ${a}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${C}.0, ${$}.0);
        return sampleTexture(${i}, uv);
      }
    `;if(C===a&&null==h)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${n[1]*n[2]*n[3]},
               ${n[2]*n[3]}, ${n[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${C}.0, ${$}.0);
        return sampleTexture(${i}, uv);
      }
    `;let T=s(i);return`
    float ${o}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${u} + col * ${c} + depth * ${l} +
          depth2 * ${a} + depth3 + ${T};
      vec2 uv = uvFromFlat(${$}, ${C}, index);
      return sampleTexture(${i}, uv);
    }
  `}(t);case 6:return function(t){let n=t.shapeInfo.logicalShape,i=t.name,o="get"+i.charAt(0).toUpperCase()+i.slice(1),{newShape:a,keptDims:l}=r.util.squeezeShape(n);if(a.length<n.length){let n=f(t,a);return`
      ${e(n)}
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${o}(${S(["row","col","depth","depth2","depth3","depth4"],l)});
      }
    `}let c=n[5],u=n[4]*c,p=n[3]*u,x=n[2]*p,h=n[1]*x;if(t.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${h}, ${x}, ${p}, ${u})) +
          dot(
            vec2(depth3, depth4),
            vec2(${c}, 1)));
        ${d(t)}
      }
    `;let v=t.shapeInfo.flatOffset,$=t.shapeInfo.texShape,C=$[0],T=$[1];if(T===h&&null==v)return`
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${x}, ${p}, ${u}, ${c})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${T}.0, ${C}.0);
        return sampleTexture(${i}, uv);
      }
    `;if(T===c&&null==v)return`
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${n[1]*n[2]*n[3]*n[4]},
               ${n[2]*n[3]*n[4]},
               ${n[3]*n[4]},
               ${n[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${T}.0, ${C}.0);
        return sampleTexture(${i}, uv);
      }
    `;let m=s(i);return`
    float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${h} + col * ${x} + depth * ${p} +
          depth2 * ${u} + depth3 * ${c} + depth4 + ${m};
      vec2 uv = uvFromFlat(${C}, ${T}, index);
      return sampleTexture(${i}, uv);
    }
  `}(t);default:throw Error(`${i.length}-D input sampling is not yet supported`)}}(e,o);let c=e.shapeInfo.logicalShape,u=t.logicalShape;return c.length<=u.length&&(n?l+=function(e,t){let n,i=e.name,o=i.charAt(0).toUpperCase()+i.slice(1),l=e.shapeInfo.logicalShape.length,c=t.logicalShape.length,u=a(e.shapeInfo.logicalShape,t.logicalShape),p=v(c),x=c-l,h=["x","y","z","w","u","v"];n=0===l?"":c<2&&u.length>=1?"coords = 0;":u.map(e=>`coords.${h[e+x]} = 0;`).join("\n");let s="";s=c<2&&l>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>`coords.${h[t+x]}`).join(", ");let d="return outputValue;",$=1===r.util.sizeFromShape(e.shapeInfo.logicalShape),f=1===r.util.sizeFromShape(t.logicalShape);if(1!==l||$||f){if($&&!f)d=1===c?`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:`
        return vec4(outputValue.x);
      `;else if(u.length){let e=l-2,t=l-1;u.indexOf(e)>-1&&u.indexOf(t)>-1?d="return vec4(outputValue.x);":u.indexOf(e)>-1?d="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":u.indexOf(t)>-1&&(d="return vec4(outputValue.xx, outputValue.zz);")}}else d=`
      return vec4(outputValue.xy, outputValue.xy);
    `;return`
    vec4 ${"get"+o+"AtOutCoords"}() {
      ${p} coords = getOutputCoords();
      ${n}
      vec4 outputValue = get${o}(${s});
      ${d}
    }
  `}(e,t):l+=function(e,t){let n,i=e.name,o=i.charAt(0).toUpperCase()+i.slice(1),l="get"+o+"AtOutCoords",c=t.texShape,u=e.shapeInfo.texShape,p=e.shapeInfo.logicalShape.length,x=t.logicalShape.length;if(!e.shapeInfo.isUniform&&p===x&&null==e.shapeInfo.flatOffset&&r.util.arraysEqual(u,c))return`
      float ${l}() {
        return sampleTexture(${i}, resultUV);
      }
    `;let h=v(x),s=a(e.shapeInfo.logicalShape,t.logicalShape),d=x-p,$=["x","y","z","w","u","v"];n=0===p?"":x<2&&s.length>=1?"coords = 0;":s.map(e=>`coords.${$[e+d]} = 0;`).join("\n");let f="";return f=x<2&&p>0?"coords":e.shapeInfo.logicalShape.map((e,t)=>`coords.${$[t+d]}`).join(", "),`
    float ${l}() {
      ${h} coords = getOutputCoords();
      ${n}
      return get${o}(${f});
    }
  `}(e,t)),l})(e,t,n.packedInputs,n.enableShapeUniforms)).join("\n"),U=t.texShape,k=(0,i.B)(),V=(l=k,`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${l.texture2D}(textureSampler, uv).r;
    }
  `),b=(C=k,`${C.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${C.varyingFs} vec2 resultUV;
    ${C.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${C.defineSpecialNaN}
    ${C.defineSpecialInf}
    ${C.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${c}
    ${u}
    ${p}
  `);return t.isPacked?(R=function(e,t,n){switch(e.length){case 0:return h();case 1:var i=0,o=t,a=n;let l=[Math.ceil(o[0]/2),Math.ceil(o[1]/2)];return 1===l[0]?a?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${l[1]}.0);
      }
    `:1===l[1]?a?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${l[0]}.0);
      }
    `:a?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${l[0]}, ${l[1]}));
      return 2 * (resTexRC.x * ${l[1]} + resTexRC.y);
    }
  `;case 2:var c=e,u=t,p=n;let x=[Math.ceil(u[0]/2),Math.ceil(u[1]/2)];if(r.util.arraysEqual(c,u))return p?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${x[0]}, ${x[1]}));
      }
    `;let s=Math.ceil(c[1]/2);return p?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${x[0]}, ${x[1]}));

      int index = resTexRC.x * ${x[1]} + resTexRC.y;
      int r = 2 * (index / ${s});
      int c = imod(index, ${s}) * 2;

      return ivec2(r, c);
    }
  `;case 3:var d=e,v=t,$=n;if($)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let f=[Math.ceil(v[0]/2),Math.ceil(v[1]/2)],S=Math.ceil(d[2]/2),C=S*Math.ceil(d[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${f[0]}, ${f[1]}));
      int index = resTexRC.x * ${f[1]} + resTexRC.y;

      int b = index / ${C};
      index -= b * ${C};

      int r = 2 * (index / ${S});
      int c = imod(index, ${S}) * 2;

      return ivec3(b, r, c);
    }
  `;default:return function(e,t,n){if(n)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let r=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],i=Math.ceil(e[e.length-1]/2),o=i*Math.ceil(e[e.length-2]/2),a=o,l="",c="b, r, c";for(let t=2;t<e.length-1;t++)a*=e[e.length-t-1],l=`
      int b${t} = index / ${a};
      index -= b${t} * ${a};
    `+l,c=`b${t}, `+c;return`
    ivec${e.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${r[0]}, ${r[1]}));
      int index = resTexRC.x * ${r[1]} + resTexRC.y;

      ${l}

      int b = index / ${o};
      index -= b * ${o};

      int r = 2 * (index / ${i});
      int c = imod(index, ${i}) * 2;

      return ivec${e.length}(${c});
    }
  `}(e,t,n)}}(t.logicalShape,U,n.enableShapeUniforms),T=k,g=`
    void setOutput(vec4 val) {
      ${T.output} = val;
    }
  `):(R=function(e,t,n){switch(e.length){case 0:return h();case 1:return i=0,a=t,l=n,1===a[0]?l?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${a[1]}.0);
      }
    `:1===a[1]?l?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${a[0]}.0);
      }
    `:l?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${a[0]}, ${a[1]}));
      return resTexRC.x * ${a[1]} + resTexRC.y;
    }
  `;case 2:return c=e,u=t,p=n,r.util.arraysEqual(c,u)?p?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${u[0]}, ${u[1]}));
      }
    `:1===c[1]?p?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${u[0]}, ${u[1]}));
        int index = resTexRC.x * ${u[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:1===c[0]?p?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${u[0]}, ${u[1]}));
        int index = resTexRC.x * ${u[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:p?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${u[0]}, ${u[1]}));
      int index = resTexRC.x * ${u[1]} + resTexRC.y;
      int r = index / ${c[1]};
      int c = index - r * ${c[1]};
      return ivec2(r, c);
    }
  `;case 3:var i,a,l,c,u,p,x=e,s=t,d=n;if(d){let e=o.WA(["r","c","d"],x);return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${e}
    return ivec3(r, c, d);
  }
`}let v=o.UG(["r","c","d"],x);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${s[0]}, ${s[1]}));
      int index = resTexRC.x * ${s[1]} + resTexRC.y;
      ${v}
      return ivec3(r, c, d);
    }
  `;case 4:var $=e,f=t,S=n;if(S){let e=o.WA(["r","c","d","d2"],$);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${e}
      return ivec4(r, c, d, d2);
    }
  `}let C=o.UG(["r","c","d","d2"],$);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${f[0]}, ${f[1]}));
      int index = resTexRC.x * ${f[1]} + resTexRC.y;
      ${C}
      return ivec4(r, c, d, d2);
    }
  `;case 5:var T=e,m=t;let R=o.UG(["r","c","d","d2","d3"],T);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${m[0]},
                             ${m[1]}));

      int index = resTexRC.x * ${m[1]} + resTexRC.y;

      ${R}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `;case 6:var g=e,w=t;let y=o.UG(["r","c","d","d2","d3","d4"],g);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${w[0]}, ${w[1]}));
      int index = resTexRC.x * ${w[1]} + resTexRC.y;

      ${y}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `;default:throw Error(`${e.length}-D output sampling is not yet supported`)}}(t.logicalShape,U,n.enableShapeUniforms),m=k,g=`
    void setOutput(float val) {
      ${m.output} = vec4(val, 0, 0, 0);
    }
  `),n.packedInputs&&(b+=x),[b,V,g,y,R,I,n.userCode].join("\n")}let c=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,u=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,p=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,x=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function h(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function s(e){return`offset${e}`}function d(e){let t=e.name,n=r.util.sizeFromShape(e.shapeInfo.logicalShape);return n<2?`return ${t};`:`
    for (int i = 0; i < ${n}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function v(e){if(e<=1)return"int";if(2===e)return"ivec2";if(3===e)return"ivec3";if(4===e)return"ivec4";if(5===e)return"ivec5";else if(6===e)return"ivec6";else throw Error(`GPU for rank ${e} is not yet supported`)}function $(e,t,n){let{newShape:i,keptDims:o}=r.util.squeezeShape(t),a=t.length,l=e&&3===a&&1===t[0],c=l?t.slice(1):i,u=!e&&a>1&&!r.util.arraysEqual(t,n)&&i.length<a||l,p=u?c:t;return{useSqueezeShape:u,uniformShape:p,keptDims:o}}function f(e,t){let n=JSON.parse(JSON.stringify(e));return n.shapeInfo.logicalShape=t,n}function S(e,t){return t.map(t=>e[t]).join(", ")}}}]);
/**!
 * @file fxhash boilerplate  
 * @version 2.0.0  
 * @copyright fxhash 2023  
 * @license MIT  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @author Laurent Houdard <https://github.com/laurent-h>  
 * @author ciphrd <https://github.com/ciphrd>  
 * @author fxhash <https://github.com/fxhash>  
 * 
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU Affero General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or (at your 
 * option) any later version.  
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU Affero General Public License for more details.  
 * 
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.  
 * 
 */

const name = "fxhaxh boilerplate";
const version = "2.0.0";

import p5 from 'p5';
import { create, all } from 'mathjs';
const math = create(all, {})

const sleep = ms => new Promise(r => setTimeout(r, ms));
// https://github.com/fxhash/fxhash-webpack-boilerplate/issues/20
const properAlphabet = 
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const variantFactor = 3.904e-87;
const fxhashDecimal = base58toDecimal(fxhashTrunc);
const offset = 0;
const limit = 1;
const featureVariant = math.max(offset, fxHashToVariant(fxhashDecimal, limit));
//~ const featureVariant = -1;
const seed = fxrand() * 1e8;

let variant = featureVariant;

let sketch = function(p5) {
  p5.setup = function() {
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    p5.frameRate(60);
    p5.noLoop();
  }
  p5.draw = async function() {
    fxpreview();
    await sleep(1);
  }
  p5.windowResized = function() {}
  p5.keyTyped = function() {
    switch (p5.key) {
      case 'r':
        console.log("redrawing canvas...");
        p5.redraw();
        break;
      case 's':
        let file = `{name}_v${version}_${variant}.png`;
        console.log(`saving canvas to ${file}...`);
        p5.saveCanvas(canvas, file);
        break;
      default:
        console.log(`key ${p5.key} was pressed, which doesn't do anything`);
    }
  }
}

console.log(fxhash)
console.log(fxrand())

const sp = new URLSearchParams(window.location.search);
console.log(sp);

// this is how to define parameters
$fx.params([
  {
    id: "number_id",
    name: "A number/float64",
    type: "number",
    //default: Math.PI,
    options: {
      min: 1,
      max: 10,
      step: 0.00000000000001,
    },
  },
  {
    id: "bigint_id",
    name: "A bigint",
    type: "bigint",
    //default: BigInt(Number.MAX_SAFE_INTEGER * 2),
    options: {
      min: Number.MIN_SAFE_INTEGER * 4,
      max: Number.MAX_SAFE_INTEGER * 4,
      step: 1,
    },
  },
  {
    id: "select_id",
    name: "A selection",
    type: "select",
    //default: "pear",
    options: {
      options: ["apple", "orange", "pear"],
    }
  },
  {
    id: "color_id",
    name: "A color",
    type: "color",
    //default: "ff0000",
  },
  {
    id: "boolean_id",
    name: "A boolean",
    type: "boolean",
    //default: true,
  },
  {
    id: "string_id",
    name: "A string",
    type: "string",
    //default: "hello",
    options: {
      minLength: 1,
      maxLength: 64
    }
  },
]);

// this is how features can be defined
$fx.features({
  "A random feature": Math.floor($fx.rand() * 10),
  "A random boolean": $fx.rand() > 0.5,
  "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand()*4)),
  "Feature from params, its a number": $fx.getParam("number_id"),
})

// log the parameters, for debugging purposes, artists won't have to do that
console.log("Current param values:")
// Raw deserialize param values 
console.log($fx.getRawParams())
// Added addtional transformation to the parameter for easier usage
// e.g. color.hex.rgba, color.obj.rgba.r, color.arr.rgb[0] 
console.log($fx.getParams())

// how to read a single raw parameter
console.log("Single raw value:")
console.log($fx.getRawParam("color_id"));
// how to read a single transformed parameter
console.log("Single transformed value:")
console.log($fx.getParam("color_id"));

// update the document based on the parameters
document.body.style.background = $fx.getParam("color_id").hex.rgba
document.body.innerHTML = `
<p>
url: ${window.location.href}
</p>
<p>
hash: ${$fx.hash}
</p>
<p>
params:
</p>
<pre>
${$fx.stringifyParams($fx.getRawParams())}
</pre>
<pre style="color: white;">
${$fx.stringifyParams($fx.getRawParams())}
</pre>
`

/*
 * Authored by Alex Hultman, 2018-2022.
 * Intellectual property of third-party.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *     http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let process = require('node:process');
let guWS = undefined;

function pump() {
	guWS.pump();
	setImmediate(pump);
}

function setup(uWS) {
	if (process.env.S_MODE) {
		guWS = uWS;
		setImmediate(pump);
	}
	return uWS;
}

module.exports = (() => {
	try {
		return setup(require('./uws_' + process.platform + '_' + process.arch + '_' + process.versions.modules + '.node'));
	} catch (e) {
		throw new Error('only Node.js 16, 18 and 20 on (glibc) Linux, macOS and Windows, on Tier 1 platforms (https://github.com/nodejs/node/blob/master/BUILDING.md#platform-list) is supported.\n\n' + e.toString());
	}
})();

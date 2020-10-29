/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Using a random color generator presented awful colors and unpredictable color schemes.
 * So we needed to come up with a color scheme of our own that creates consistent, pleasing color patterns.
 * The order allows us to guarantee that 1st, 2nd, 3rd, etc values always get the same color.
 */
export const seedColors: string[] = [
  '#12ADC8',
'#E3B124',
'#586167',
'#B4B1AA',
'#EC6923',
'#044F8D',
'#FEC044',
'#289999'
];

/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/moment';
@Pipe({
    name: 'dateformat'
})
export class DateFormat implements PipeTransform {
    transform(value: string, param: any): any {
        try {
            if (param === 'MMM DD, YYYY') {
                value = moment(value).format(param);
            } else if (param === 'MMM DD, YY') {
                value = moment(value).format(param);
            } else if (param === 'MMM Do, YY') {
                value = moment(value).format(param);
            } else if (param === 'MMM Do, YYYY') {
                value = moment(value).format(param);
            } else if (param === 'MMMM DD, YYYY') {
                value = moment(value).format(param);
            } else if (param === 'MMMM DD, YY') {
                value = moment(value).format(param);
            } else if (param === 'MMM/DD/YYYY') {
                value = moment(value).format(param);
            } else if (param === 'MMM/DD/YYYY') {
                value = moment(value).format(param);
            } else if (param === 'MM/DD/YYYY') {
                value = moment(value).format(param);
            } else if (param === 'MM/DD/YY') {
                value = moment(value).format(param);
            } else if (param === 'DD/MM/YY') {
                value = moment(value).format(param);
            } else if (param === 'DD/MM/YYYY') {
                value = moment(value).format(param);
            } else if (param === 'Do/MM/YYYY') {
                value = moment(value).format(param);
            } else if (param === 'YYYY-MM-DD HH:mm:ss') {
                value = moment(value).format(param);
            } else if (param === 'YYYY-MM-DD HH:mm') {
                value = moment(value).format(param);
            } else if (param === 'YYYY-MM-DD') {
                value = moment(value).format(param);
            } else {
                value = moment(value).format('MMM DD, YYYY');
            }
        } catch (e) {

        }
        return value;
    }
}

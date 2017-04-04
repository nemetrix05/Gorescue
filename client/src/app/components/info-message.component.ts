/**
 * Component to create a customizable message modal into the view.
 * Parent component must declare this component as a ViewChild to execute 
 * its methods. E.g.
 * @ViewChild(InfoMessageComponent) infoMsg: InfoMessageComponent;
 * Use selector (<info-message></info-message>) anywhere in the html to use it.
 * To open modal message by button call the method showMessage from the ViewChild reference
 * <button type="button" class="btn btn-default" (click)="infoMsg.testMessageModal('msg')">Show message</button>
 * @author Jaime Beltran
 */

import { Component } from '@angular/core';


@Component({
    selector: 'info-message',
    template: `
    <div class="modal fade blue" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': messageVisible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" (click)="hideMessage()" aria-label="Close"><span aria-hidden="true">&times;</span></button>            
                <h1>{{messageTitle}}</h1>
                <p>{{message}}</p>
                <div class="row">
                    <div class="col-md-6 col-md-offset-6">
                        <div class="row">
                            <div class="col-md-6" [hidden]="!additionalButton" [ngClass]="{'col-md-offset-6': !cancelButton}">
                                <button type="button" (click)="additionalButtonCallBackFunction()" class="ui button" style="margin:0;">{{additionalButton}}</button>
                            </div>
                            <div class="col-md-6" [hidden]="!cancelButton" [ngClass]="{'col-md-offset-6': !additionalButton}">
                                <button type="button" (click)="hideMessage()" class="ui button" style="margin:0;">CANCELAR</button>
                            </div>  
                        </div>
                    </div>   
                </div>  
            </div><!--end modal-body-->    
        </div><!--end modal-content-->     
      </div>
    </div>
      `
})
export class InfoMessageComponent
{
    private message: string;
    private messageTitle: string;
    public messageVisible: boolean;
    private visibleAnimate = false;


    private cancelButton:boolean;
    private additionalButton:string;
    private buttonAction;


    constructor(){
        this.cancelButton=false;
        this.additionalButton=null;
        this.buttonAction=null;
    }


    /**
     * Enables the cancel button display in the message. By default 
     * cancel button is not showed
     * @param {show:boolean} true to show, false otherwise
     * @author Jaime Beltran
     */
    showCancelButton(show:boolean){
        this.cancelButton=show;
    }


    /**
     * Configures a button into the message modal dialog which can be customized with a name
     * and a function. If not function is given button will close modal when clicked. 
     * @param {btnName:string} Name to display into the button
     * @param {callBack:function} Function to execute when button is clicked. 
     *                            When function finish modal would be closed automatically. 
     *                     
     * @author Jaime Beltran
     */
    setAdditionalButton(btnName:string,callBack?){
        this.additionalButton=btnName;
        if (callBack && typeof callBack === "function") {
            this.buttonAction=callBack;
        }else{
            this.buttonAction=function(){
                this.hideMessage();
            };
        }
    }

    /**
     * Set and display a message into the window as a modal
     * @param {msg:string} message to show
     * @param {msgTitle:string} (optional) Title of the message
     * @author Jaime Beltran
     */
    showMessage(msg:string, msgTitle?:string)
    {
        if(msgTitle){
            this.messageTitle=msgTitle;
        }
        this.message = msg;
        this.messageVisible = true;
        setTimeout(() => this.visibleAnimate = true);
    }

    /**
     * Hides the current displayed message in the window
     * @author Jaime Beltran
     */
    hideMessage()
    {
        this.visibleAnimate = false;
        setTimeout(() => this.messageVisible = false, 300);
    }

    /**
     * Function to excute the custom action of the message's button.
     * This function is called by the template
     * @author Jaime Beltran
     */
    additionalButtonCallBackFunction(){
        if(this.buttonAction!=null && typeof this.buttonAction === "function"){
            this.buttonAction();
        }
        this.hideMessage();
    }
}
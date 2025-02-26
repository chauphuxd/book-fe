import { Row, Steps } from 'antd';
import OrderDetail from 'components/client/order'
import Complete from 'components/client/order/completePayment';
import Payment from 'components/client/order/payment';
import React, { useState } from 'react'

export default function OrderPage() {

    const [currentStep, setCurrentStep] = useState<number>(0);

    return (

        <div style={{ background: '#efefef', padding: '20px 0' }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto', backgroundColor: "white" }}>
                <div className="order-steps" style={{ padding: "10px" }}>
                    <Steps
                        size="small"
                        current={currentStep}
                        onChange={(step) => setCurrentStep(step)}
                        items={[
                            {
                                title: 'Đơn hàng',
                            },
                            {
                                title: 'Đặt hàng',
                            },
                            {
                                title: 'Thanh toán',
                            },
                        ]}
                    />
                </div>

                {currentStep === 0 &&
                    <OrderDetail setCurrentStep={setCurrentStep} />
                }
                {currentStep === 1 &&
                    <Payment setCurrentStep={setCurrentStep} />}
                {currentStep === 2 &&
                    <Complete setCurrentStep={setCurrentStep} />}
            </div>
        </div>

    )
}

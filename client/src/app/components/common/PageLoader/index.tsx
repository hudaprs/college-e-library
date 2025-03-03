import { SmileOutlined } from '@ant-design/icons'
import { Result, Spin } from 'antd'

export const PageLoader = () => (
  <div className='bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen'>
    <Result
      icon={<SmileOutlined />}
      title='Application loading, please wait...'
      subTitle={<Spin size='large' />}
    />
  </div>
)

import React from 'react'
import {Link} from 'react-router-dom'

function FooterAdmin() {
    return (
        <div>
            <footer id="footer" className="footer">
                <div className="copyright">
                    © Bản quyền <strong><span>HandBag Website</span></strong>. Đã đăng ký Bản quyền
                </div>
                <div className="credits">
                    Thiết kế bởi <Link to="#">HandBag Developer Team</Link>
                </div>
            </footer>
        </div>
    )
}

export default FooterAdmin

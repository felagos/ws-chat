export const ChatPage = () => {
	return (
		<div className="messaging">
			<div className="inbox_msg">

				<div className="inbox_people">

					<div className="headind_srch">
						<div className="recent_heading mt-2">
							<h4>Recientes</h4>
						</div>
						<div className="srch_bar">
							<div className="stylish-input-group">
								<button className="btn text-danger">
									Salir
								</button>
							</div>
						</div>
					</div>

					<div className="inbox_chat">
						<div className="chat_list active_chat">
							<div className="chat_people">
								<div className="chat_img">
									<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
								</div>
								<div className="chat_ib">
									<h5>Some random name</h5>
									<span className="text-success">Online</span>
									<span className="text-danger">Offline</span>
								</div>
							</div>
						</div>

						<div className="chat_list">

							<div className="chat_people">
								<div className="chat_img">
									<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
								</div>
								<div className="chat_ib">
									<h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
									<p>Test, which is a new approach to have all solutions
										astrology under one roof.</p>
								</div>
							</div>

						</div>

						<div className="extra_space"></div>

					</div>

				</div>

				<div className="mesgs">

					<div className="msg_history">

						<div className="incoming_msg">
							<div className="incoming_msg_img">
								<img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
							</div>
							<div className="received_msg">
								<div className="received_withd_msg">
									<p>Test which is a new approach to have all
										solutions</p>
									<span className="time_date"> 11:01 AM | June 9</span>
								</div>
							</div>
						</div>

						<div className="outgoing_msg">
							<div className="sent_msg">
								<p>Test which is a new approach to have all
									solutions</p>
								<span className="time_date"> 11:01 AM | June 9</span>
							</div>
						</div>


					</div>

					<div className="type_msg row">
						<div className="input_msg_write col-sm-9">
							<input type="text" className="write_msg" placeholder="Mensaje..." />
						</div>
						<div className="col-sm-3 text-center">
							<button className="msg_send_btn mt-3" type="button">
								enviar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
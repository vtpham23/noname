import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	jsrgshichong(player) {
		const bool = player.storage.jsrgshichong;
		let yang = "Bạn có thể lấy một lá bài trên tay của nhân vật mục tiêu",
			yin = "Nhân vật mục tiêu có thể đưa cho bạn một lá bài trên tay";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Sau khi bạn sử dụng bài chỉ định một nhân vật khác làm mục tiêu duy nhất, ",
			end = "。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	jsrgdangren(player) {
		const bool = player.storage.jsrgdangren;
		let yang = "Khi bạn cần sử dụng【Đào】cho bản thân, bạn có thể coi như đã sử dụng",
			yin = "Khi bạn có thể sử dụng【Đào】cho nhân vật khác, bạn phải coi như đã sử dụng";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi。",
			end = "。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
};

export default dynamicTranslates;

import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	spzhenting(player, skill) {
		if (player.hasSkill("spjincui_delete")) {
			return "Mỗi vòng giới hạn một lần. Khi bạn hoặc một nhân vật trong phạm vi tấn công của bạn trở thành mục tiêu của【Sát】hoặc một tây dược trì hoãn, nếu bạn không phải là người sử dụng tây này, bạn có thể chọn một trong những điều sau: ① Loại bỏ một lá bài ở tay của người sử dụng; ② Rút một lá bài."
		}
		return lib.translate[`${skill}_info`];
	},
};
export default dynamicTranslates;
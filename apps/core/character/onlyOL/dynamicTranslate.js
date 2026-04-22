const dynamicTranslates = {
	olsblixian(player) {
		let names =
			player
				.getStorage("olsblixian_names")
				.map((name, i, arr) => `${i == arr.length - 1 ? "hoặc" : "、"}【${get.translation(name)}】`)
				.join("") || "";
		let triggers =
			player
				.getStorage("olsblixian_triggers")
				.map(i => get.translation(i))
				.join("、") + "hoặc";
		if (triggers.length < 2) {
			triggers = "";
		}
		return `${triggers}Sau khi bạn nhận sát thương, bạn có thể sử dụng một lá bài như【Vô Trung Sinh Hữu】${names}. Sau khi bạn dùng cách này để sử dụng ba loại bài Cẩm Nang có tên khác nhau, kỹ năng này cũng có thể kích hoạt vào giai đoạn kết thúc của bạn.`;
	},
	olsbqianfu(player) {
		const bool = player.storage.olsbqianfu;
		let yang = "Bạn có thể sử dụng một lá bài đen như【Quá Hà Sái Kiều】",
			yin = "Bạn có thể sử dụng một lá bài đỏ như【Hỏa Công】";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = `Kỹ năng chuyển đổi, giai đoạn ra bài${player.hasSkill("olsbqianfu_remove") ? "mỗi loại giới hạn một lần" : ""}, `,
			end = ". Sau khi giải quyết, bạn có thể đặt lá bài bị bỏ vào đỉnh bài.";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	olsbzhijue(player) {
		const bool = player.storage.olsbzhijue;
		let yang = "Giai đoạn ra bài, bạn có thể sử dụng lá bài trên đỉnh bài như【Hỏa Công】",
			yin = "Đặt tất cả bài trên tay cùng màu vào đống bỏ bài (mỗi màu giới hạn một lần mỗi lượt), sau đó có thể xem như sử dụng một trong số đó như bài cơ bản hoặc bài Cẩm Nang thông thường";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Chuyển đổi kỹ，",
			end = "。Nếu ngươi chưa gây sát thương bằng cách này，ngươi khiến〖Tri Thiên〗bài có thể thấy và số bài quan sát -1（giảm ít nhất xuống 1），sau đó ngươi rút hai lá bài。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	olsbjinming(player) {
		let str = "Khi bắt đầu lượt，ngươi có thể chọn một hạng mục：";
		for (let i of ["1.Đã hồi phục hơn 1 điểm thể lực；", "2.Đã bỏ hai lá bài；", "3.Đã sử dụng ba loại bài；", "4.Đã gây 4 điểm sát thương。"]) {
			if (!player.getStorage("olsbjinming").includes(parseInt(i.slice(0, 1)))) {
				i = `<span style="text-decoration: line-through;">${i}</span>`;
			}
			str += i;
		}
		str += "Sau đó khi kết thúc lượt này ngươi rút X lá bài，nếu không thỏa mãn điều kiện đã chọn，thì xóa tùy chọn này（X là số thứ tự tùy chọn mà ngươi chọn lần cuối khi phát động〖Căng Danh〗）。";
		return str;
	},
	old_oljiaozhao(player) {
		if (player.countMark("old_oldanxin")) {
			return lib.translate[`old_oljiaozhao_lv${player.countMark("old_oldanxin")}_info`];
		}
		return lib.translate["old_oljiaozhao_info"];
	},
	oljiaozhao(player) {
		if (player.countMark("oldanxin")) {
			return lib.translate[`oljiaozhao_lv${player.countMark("oldanxin")}_info`];
		}
		return lib.translate["oljiaozhao_info"];
	},
};
export default dynamicTranslates;


import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
	mbkubai(player, skill) {
		const level = player.countMark(skill);
		if (!level) {
			return lib.translate[`${skill}_info`];
		}
		if (level === 1) {
			return lib.translate[`${skill}_suit_info`];
		}
		return lib.translate[`${skill}_number_info`];
	},
	mbweizhuang(player, skill) {
		if (!player) {
			return lib.translate[`${skill}_info`];
		}
		if (get.nameList(player).includes("mb_cuilingyi")) {
			const skin = player.skin[player.name2 === "mb_cuilingyi" ? "name2" : "name"],
				index = lib.characterSubstitute["mb_cuilingyi"].map(i =>i[0]).indexOf(skin);
			if (index >= 0) {
				const trueSkill = `${skill}_${skin.slice(13, -1)}x`;
				return get.skillInfoTranslation(trueSkill, player, false);
			}
		}
		return "Bộ quần áo này, há phải ngươi xứng mặc?";
	},
	mbfozong(player) {
		const list = player.getStorage("mbfozong");
		if (!list?.length) {
			return lib.translate["mbfozong"];
		}
		const colors = list?.map(i => get.translation(i))?.join(" và ");
		return `Khóa định kỹ, bài trên tay màu ${colors} của ngươi không tính vào giới hạn bài trên tay, giá trị sát thương gây ra và giá trị hồi phục +1。`;
	},
	yizan_use(player) {
		if (player.storage.yizan) {
			return "Ngươi có thể dùng một lá bài cơ bản như bất kỳ lá bài cơ bản nào để sử dụng hoặc đánh ra。";
		}
		return "Ngươi có thể dùng hai lá bài (trong đó ít nhất một lá là bài cơ bản) như bất kỳ sử dụng hoặc đả xuất";
	},
	miaojian(player) {
		return ["Giới hạn một lần mỗi giai đoạn ra bài. Bạn có thể dùng một lá【Sát】như【Thích Sát】, hoặc dùng một lá bài cẩm nang như【Vô trung sinh hữu】.", "Giới hạn một lần mỗi giai đoạn ra bài. Bạn có thể dùng một lá bài cơ bản như【Thích Sát】, hoặc dùng một lá bài phi cơ bản như【Vô Trung Sinh Hữu】.", "Giới hạn một lần mỗi giai đoạn ra bài. Bạn có thể coi như đã sử dụng một lá【Thích Sát】 hoặc【Vô Trung Sinh Hữu】."][player.countMark("miaojian")];
	},
	shhlianhua(player) {
		return ["Khi bạn trở thành mục tiêu của【Sát】, bạn rút một lá bài.", "Khi bạn trở thành mục tiêu của【Sát】, bạn rút một lá bài. Sau đó bạn phán định, nếu kết quả là bích, thì【Sát】này vô hiệu với bạn.", "Khi bạn trở thành mục tiêu của【Sát】, bạn rút một lá bài. Sau đó người dùng【Sát】này chọn một: ①Bỏ một lá bài. ②Khiến【Sát】này vô hiệu với bạn."][player.countMark("shhlianhua")];
	},
	mobilexingxue(player) {
		return lib.translate[(player.storage.mobileyanzhu ? "mobilexingxuex" : "mobilexingxue") + "_info"];
	},
	shoufa(player) {
		const zhoufa = player.storage.zhoulin_zhoufa;
		const nodoudizhu = get.mode() == "doudizhu" ? "nhân vật có khoảng cách không nhỏ hơn 1/không lớn hơn 1 với bạn" : "nhân vật có khoảng cách không nhỏ hơn 2/không lớn hơn 2 với bạn";
		if (!zhoufa) {
			return "Khi bạn nhận sát thương/lần đầu gây sát thương trong một lượt, bạn có thể chọn một " + nodoudizhu + ", khiến họ thực hiện ngẫu nhiên một trong các mục sau: Báo, khiến họ nhận 1 điểm sát thương không có nguồn; Ưng, bạn lấy ngẫu nhiên một lá bài của họ; Gấu, bạn bỏ ngẫu nhiên một lá bài trong vùng trang bị của họ; Thỏ, khiến họ rút một lá bài.";
		}
		let str = "Khi bạn nhận sát thương/lần đầu gây sát thương trong một lượt, bạn có thể chọn một " + nodoudizhu + ", ";
		str += ["khiến họ nhận 1 điểm sát thương không có nguồn", "bạn lấy ngẫu nhiên một lá bài của họ", "bạn bỏ ngẫu nhiên một lá bài trong vùng trang bị của họ", "khiến họ rút một lá bài"][["豹", "鹰", "熊", "兔"].indexOf(zhoufa)];
		return str + "。";
	},
	mbxuetu(player) {
		const bool = player.storage.mbxuetu,
			status = player.countMark("mbxuetu_status");
		if (status === 1) {
			return lib.translate.mbxuetu_achieve_info;


		}
		let yang = status === 0 ? "Bạn có thể khiến một nhân vật hồi phục 1 điểm thể lực" : "Bạn có thể hồi phục 1 điểm thể lực, sau đó khiến một nhân vật khác bỏ hai lá bài",
			yin = status === 0 ? "Bạn có thể khiến một nhân vật rút hai lá bài" : "Bạn có thể rút một lá bài, sau đó gây 1 điểm sát thương cho một nhân vật khác";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Giới hạn một lần mỗi giai đoạn ra bài, ",
			end = "。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	mbzuoyou(player) {
		const bool = player.storage.mbzuoyou;
		let yang = "Bạn có thể khiến một nhân vật rút ba lá bài, sau đó nhân vật đó bỏ hai lá bài",
			yin = "Bạn có thể khiến một nhân vật nhận 1 điểm giáp";
		if (bool) {
			yin = `<span class='bluetext'>${yin}</span>`;
		} else {
			yang = `<span class='firetext'>${yang}</span>`;
		}
		let start = "Kỹ năng chuyển đổi. Giới hạn một lần mỗi giai đoạn ra bài, ",
			end = "。";
		return `${start}Dương：${yang}；Âm：${yin}${end}`;
	},
	mbfunan(player) {
		if (player.storage.mbfunan_rewrite) {
			return `Khi các nhân vật khác sử dụng hoặc đánh bài để phản hồi bài bạn sử dụng, bạn có thể lấy bài mà họ đã sử dụng hoặc đánh ra, và sau khi kết thúc tính toán bài bạn sử dụng bằng cách này, nếu không có nhân vật khác phản hồi bài đó, bạn rút một lá bài.`;
		}
		return `Khi các nhân vật khác sử dụng hoặc đánh bài để phản hồi bài bạn sử dụng, bạn có thể lấy bài mà họ đã sử dụng hoặc đánh ra.`;
	},
	mbxuehen(player) {
		const storage = player.storage.mbxuehen;
		let str = "Sau lần đầu tiên trong mỗi lượt bạn gây ra hoặc nhận sát thương, bạn có thể trưng ra tối đa X lá bài trên tay (X là số điểm thể lực đã mất), những lá bài này chỉ có thể được sử dụng hoặc đánh ra như【Sát】không tính vào số lần và không giới hạn số lần sử dụng, cho đến khi bạn gây sát thương bằng những lá bài này";
		if (storage) {
			str += "，và sau khi kết thúc tính toán【Sát】được chuyển đổi bằng cách này, bạn rút một lá bài";
		}
		str += "。";
		return str;
	},
};
export default dynamicTranslates;


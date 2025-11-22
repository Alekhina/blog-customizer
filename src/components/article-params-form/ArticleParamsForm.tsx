import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (currentArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [font, setFont] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);

	const [isOpened, setIsOpened] = useState<boolean>(false);

	const asideRef = useRef(null);

	useOutsideClickClose({
		isOpen: isOpened,
		rootRef: asideRef,
		onClose: () => setIsOpened(false),
		onChange: setIsOpened,
	});

	const toggleState = () => {
		setIsOpened((prevState) => !prevState);
	};

	const handleArrowButton = () => {
		toggleState();
	};

	const handleReset = () => {
		setCurrentArticleState(defaultArticleState);
		setFont(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setFontSize(defaultArticleState.fontSizeOption);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentArticleState({
			fontFamilyOption: font,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpened}
				onClick={handleArrowButton}
				// ref={asideRef}
			/>
			<aside
				className={clsx(styles.container, isOpened && styles.container_open)}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={font}
						onChange={setFont}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
						name='fontSize'
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={backgroundColor}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
